//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase


class Ninja extends Sprite {
  #zivot;
  constructor(x, y, layer) {
    super(x, y, 32, 32);
    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [2, 3, 4],
      "down": [1],
      "walk-down": [1],
      "left": [8],
      "walk-left": [7, 6, 5]
    };
    this.#zivot = 3
    this.layer = layer;
    this.visible = true; //tek kad se postavi layer

    this.bodovi = 0;

  }


  get zivot() {
    return this.#zivot;
  }

  set zivot(l) {
    if (l <= 0) {
      btnStop_click();
      this.visible = false;
      alert("Game over!")

    }
    else {
      this.#zivot = l;
    }
  }
  jump(h = 35) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

  pucaj() {

    //! stvaramo novi objekt projektil
    let s = new Projektil(GAME.getSpriteLayer("shuriken"));
    GAME.addSprite(s);

    //! dodajemo ga u poseban popis za lakše praćenje
    s.rbr = Postavke.projektili.length;
    Postavke.projektili.push(s);

    // postavi na poziciju i smjer trenutnog lika
    s.x = this.x;
    s.y = this.y;
    s.direction = this.direction;

    s.put = 0;
    s.visible = true;
    s.move = true;

  }

  pokupi(c) {
    this.bodovi += c.value;
  }


}

class Prijelaz extends Item {
  constructor(layer, x, y) {
    super(layer);
    this.visible = true;
    this.x = x;
    this.y = y;
  }
}

class Neprijatelj extends Sprite {
  constructor(x, y, dg, gg, layer) {
    super(x + 10, y + 10, 35, 35);

    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [1, 2],
      "down": [1],
      "walk-down": [1],
      "left": [4],
      "walk-left": [4, 3]
    };

    this.okvir = false;
    this.layer = layer;
    this.visible = true;
    this.dg = dg;
    this.gg = gg;


  }

  updatePosition() {
    super.updatePosition(2, 0.8);

  }

  kretanje() {

    if (this.direction == 90) {
      if (this.x < this.gg * 32) {
        this.moveRight();
      }
      else {
        this.direction = 270;
      }
    }
    else if (this.x > this.dg * 32) {
      this.moveLeft();
    }
    else {
      this.direction = 90;
    }
  }

  moveRight(x = 0.75) {
    this.direction = 90;
    this.velocity_x += x;
  }

  moveLeft(x = 0.75) {
    this.direction = 270;
    this.velocity_x -= x;
  }

  mrtav() {
    this.visible = false;
  }
}

class Projektil extends Item {
  #put;
  constructor(layer) {
    super(layer);
    this.visible = false;
    this.put = 0;
    this.move = true;

    // ne možemo koristiti #collidedPlatform jer će se dogoditi greška
    // klasa Sprite nema svojstvo, a collidedPlatform se koristi na više mjesta
    this._collidedPlatform = "";
  }

  // potrebno je definirati svojstvo kako bi se točno znalo u kojem trenutku dira neku platformu
  get collidedPlatform() {
    return this._collidedPlatform;
  }
  set collidedPlatform(v) {
    // ako dira platformu, onda string nije prazan već se radi o strani s koje je dira
    if (v != "") {
      // zaustavi projektil
      this.stop();
    }

    this._collidedPlatform = v;
  }

  get put() {
    return this.#put;
  }
  set put(v) {
    if (v >= 200) {
      this.#put = 0;
      this.stop(); // vraća sve postavke za projektil
    }
    else {
      this.#put = v;
    }
  }

  updatePosition() {
    if (this.move) {

      // ovo mora biti prije promjene x-a kako bi se ponašalo "normalno"
      // kod dodira s platformom (update old_x i old_y)
      //super.updatePosition();

      // kretanje projektila po posebnim pravilima
      if (this.direction == 90) {
        this.x += 5; // ide desno
        this.put += 5; // povećava put
      }
      else {
        this.x -= 5; // ide lijevo
        this.put += 5; // povećava put
      }

    }
  }

  stop() {
    this.visible = false;
    this.move = false;

    // popis svih likova u mapi
    let sprites = GAME.activeWorldMap.sprites;

    // izbaci onog koji staje (tako da se više ne crta)
    for (let i = sprites.length - 1; i >= 0; i--) {
      if (sprites[i] === this) {
        sprites.splice(i, 1); // brisanje i-tog elementa        

        Postavke.ukloniProjektil(this);

        break;
      }
    }

  }
}

class Potion extends Item {
  constructor(layer, x, y,) {
    super(layer);
    this.lives = 1;
    this.x = x;
    this.y = y;
    this.visible = true;

  }
}

class Ashtar extends Sprite {
  constructor(x, y, dg, gg, layer) {
    super(x + 10, y + 10, 50, 50);

    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [8],
      "walk-right": [8, 7, 6, 5],
      "down": [1],
      "walk-down": [1],
      "left": [4],
      "walk-left": [4, 3, 2, 1]
    };

    this.okvir = false;
    this.layer = layer;
    this.visible = true;
    this.dg = dg;
    this.gg = gg;
    this.zivot = 10;


  }

  updatePosition() {
    super.updatePosition(2, 0.8);

  }

  kretanje() {

    if (this.direction == 90) {
      if (this.x < this.gg * 32) {
        this.moveRight();
      }
      else {
        this.direction = 270;
      }
    }
    else if (this.x > this.dg * 32) {
      this.moveLeft();
    }
    else {
      this.direction = 90;
    }
  }

  moveRight(x = 0.75) {
    this.direction = 90;
    this.velocity_x += x;
  }

  moveLeft(x = 0.75) {
    this.direction = 270;
    this.velocity_x -= x;
  }

  mrtav() {
    if (this.zivot = 0) {
      this.visible = false;
    }
  }
}
