//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>

// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "level1":
      setupLevel1();
      break;
    case "level2":
      setupLevel2();
      break;
    case "level3":
      setupLevel3()
    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */
function setupLevel1() {

  alert("Kontrole igrice: Strelice za pokretanje lika. Tipka D za bacanje shurikena");

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platform-wall");

  let n = new Ninja(0, 512, GAME.getSpriteLayer("ninja"));
  GAME.addSprite(n);
  Postavke.ninja = n;


  Postavke.vrata = new Prijelaz(GAME.getLayer("vrata"),1060,543)
  GAME.addSprite(Postavke.vrata)

  // zeleni sjekaci
  Postavke.zeleni_s = new Neprijatelj(10 * 32, 2 * 32, 11, 14, GAME.getSpriteLayer("zeleni-sjekac"));
  GAME.addSprite(Postavke.zeleni_s);
 

  //zuti sjekaci
  Postavke.zuti_s = new Neprijatelj(12 * 32, 11 * 32, 12, 13.5, GAME.getSpriteLayer("zuti-sjekac"));
  GAME.addSprite(Postavke.zuti_s);

  //pauk
  Postavke.pauk = new Neprijatelj(15 * 32, 17 * 32, 16, 22, GAME.getSpriteLayer("pauk"));
  GAME.addSprite(Postavke.pauk);
 
  //kostur
  Postavke.kostur = new Neprijatelj(28 * 32, 3 * 32, 29, 32, GAME.getSpriteLayer("kostur"));
  GAME.addSprite(Postavke.kostur);

  Postavke.projektil = new Projektil(GAME.getSpriteLayer("shuriken"));
  GAME.addSprite(Postavke.projektil);

  Postavke.plavip = new Potion(GAME.getSpriteLayer("p1"), 640, 480,10);
  GAME.addSprite(Postavke.plavip);

  Postavke.crvenip = new Potion(GAME.getSpriteLayer("c1"), 0, 575.99,20);
  GAME.addSprite(Postavke.crvenip);
}

function setupLevel2() {

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platform-wall");

  let n = new Ninja(100, 448, GAME.getSpriteLayer("ninja"));
  GAME.addSprite(n);
  Postavke.ninja = n;

  
  Postavke.strelica = new Prijelaz(GAME.getLayer("d_znak"),1056,448)
  GAME.addSprite(Postavke.strelica)
  
  Postavke.projektil = new Projektil(GAME.getSpriteLayer("shuriken"));
  GAME.addSprite(Postavke.projektil);
  

  // zeleni sjekaci
  Postavke.zeleni_s = new Neprijatelj(0 * 32, 0 * 32, 1, 6, GAME.getSpriteLayer("zeleni-sjekac"));
  GAME.addSprite(Postavke.zeleni_s);

  //zuti sjekaci
  Postavke.zuti_s = new Neprijatelj(24 * 32, 13.5 * 32, 25, 32, GAME.getSpriteLayer("zuti-sjekac"));
  GAME.addSprite(Postavke.zuti_s);

  //pauk
  Postavke.pauk = new Neprijatelj(0 * 32, 11.5 * 32, 0, 2, GAME.getSpriteLayer("pauk"));
  GAME.addSprite(Postavke.pauk);
 
  //kostur
  Postavke.kostur = new Neprijatelj(30 * 32, 1 * 32, 31, 34, GAME.getSpriteLayer("kostur"));
  GAME.addSprite(Postavke.kostur);
 
  Postavke.plavip = new Potion(GAME.getSpriteLayer("p1"), 320, 410,10);
  GAME.addSprite(Postavke.plavip);

  Postavke.crvenip = new Potion(GAME.getSpriteLayer("c1"), 960, 122,20);
  GAME.addSprite(Postavke.crvenip);

}
function setupLevel3(){
  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platform-wall");

  let n = new Ninja(200, 512, GAME.getSpriteLayer("ninja"));
  GAME.addSprite(n);
  Postavke.ninja = n;

  Postavke.projektil = new Projektil(GAME.getSpriteLayer("shuriken"));
  GAME.addSprite(Postavke.projektil);


  Postavke.ashtar= new Ashtar( 20 * 32, 14 * 32, 5, 30, GAME.getSpriteLayer("ashtar"))
  GAME.addSprite(Postavke.ashtar)

   
  Postavke.plavip = new Potion(GAME.getSpriteLayer("p1"), 320, 500,10);
  GAME.addSprite(Postavke.plavip);

  Postavke.crvenip = new Potion(GAME.getSpriteLayer("c1"), 960, 500,20);
  GAME.addSprite(Postavke.crvenip);

}