class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

  /** @type {Ninja} */
  static ninja = null;

  /** @type {Projektil} */
  static projektil;

  /** @type {Prijelaz} */
  static vrata = null;
  static strelica = null;


  /** @type {Potion} */
  static plavip = null;
  static crvenip = null;


  /** @type {Neprijatelj} */
  static zeleni_s = null;

  static zuti_s = null;

  static pauk = null

  static kostur = null;

  /** @type {Ashtar} */
  static ashtar = null;

  static bodovi = 0;

  static dno = 12 * 32;


  static projektili = [];

  static ukloniProjektil(p) {
    for (let i = Postavke.projektili.length - 1; i >= 0; i--) {
      if (Postavke.projektili[i] === p) {
        Postavke.projektili.splice(i, 1); // brisanje i-tog elementa       
        break;
      }
    }
  }

  static noviLevel2() {
    GAME.setActiveWorldMap("level2");
    ENGINE.stop();
    setupLevel2();
    ENGINE.start();
  }

  static noviLevel3() {
    GAME.setActiveWorldMap("level3");
    ENGINE.stop();
    setupLevel3();
    ENGINE.start();
  }
  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}