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
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "v10")
    vjezbe10();
  if (GAME.activeWorldMap.name == "test")
    test();
  if (GAME.activeWorldMap.name == "level1")
    level1();
  if (GAME.activeWorldMap.name == "level2")
    level2();
  if (GAME.activeWorldMap.name == "level3")
    level3();
  GAME.update();

};




function level1() {
  GameSettings.output("Bodovi: " + Postavke.bodovi, true);


  if (SENSING.right.active) {
    Postavke.ninja.moveRight();
  }

  if (SENSING.left.active) {
    Postavke.ninja.moveLeft();
  }
  if (SENSING.up.active) {
    Postavke.ninja.jump();
  }

  if (SENSING.keyD.active) {
    if (!Postavke.ninja.puca) {
      Postavke.ninja.puca = true;
      Postavke.ninja.pucaj();
    }
  }
  else {
    Postavke.ninja.puca = false;
  }

  for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
    if (p.touching(Postavke.zeleni_s)) {
      p.stop();
      Postavke.zeleni_s.mrtav();
      Postavke.bodovi += 30;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }
    if (p.touching(Postavke.zuti_s)) {
      p.stop();
      Postavke.zuti_s.mrtav();
      Postavke.bodovi += 30;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }

    if (p.touching(Postavke.pauk)) {
      p.stop();
      Postavke.pauk.mrtav();
      Postavke.bodovi += 40;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }

    if (p.touching(Postavke.kostur)) {
      p.stop();
      Postavke.kostur.mrtav();
      Postavke.bodovi += 50;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }
  }




  if (Postavke.ninja.touching(Postavke.vrata)) {
    Postavke.noviLevel2();

   
  }

  Postavke.zeleni_s.kretanje();


  Postavke.zuti_s.kretanje();

  Postavke.pauk.kretanje();

  Postavke.kostur.kretanje();


  if (Postavke.zeleni_s.touching(Postavke.ninja)) {
    if (Postavke.zeleni_s.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;
      

    }

  }

  if (Postavke.zuti_s.touching(Postavke.ninja)) {
    if (Postavke.zuti_s.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;

    }
  }

  if (Postavke.pauk.touching(Postavke.ninja)) {
    if (Postavke.pauk.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;

    }
  }

  if (Postavke.kostur.touching(Postavke.ninja)) {
    if (Postavke.kostur.visible == true) {
      Povratak()
      Postavke.ninja.zivot--;

    }
  }

  function Povratak() {
    Postavke.ninja.x = 0;
    Postavke.ninja.y = 512;

  }

  if (Postavke.ninja.y == 608) {
    Povratak()
    Postavke.ninja.zivot--;
  }

  if (Postavke.ninja.touching(Postavke.plavip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot++;
      Postavke.plavip.visible = false;
      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
    }
  }

  if (Postavke.ninja.touching(Postavke.crvenip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot = 3;
      Postavke.crvenip.visible = false;

      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);

    }
  }
  GameSettings.output("Broj života: " + Postavke.ninja.zivot + "\nBodovi: " + Postavke.bodovi, true);

}

function level2() {
  if (SENSING.right.active) {
    Postavke.ninja.moveRight();
  }

  if (SENSING.left.active) {
    Postavke.ninja.moveLeft();
  }
  if (SENSING.up.active) {
    Postavke.ninja.jump();
  }

  if (SENSING.keyD.active) {
    if (!Postavke.ninja.puca) {
      Postavke.ninja.puca = true;
      Postavke.ninja.pucaj();
    }
  }
  else {
    Postavke.ninja.puca = false;
  }

  for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
    if (p.touching(Postavke.zeleni_s)) {
      p.stop();
      Postavke.zeleni_s.mrtav();
      Postavke.bodovi += 30;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }
    if (p.touching(Postavke.zuti_s)) {
      p.stop();
      Postavke.zuti_s.mrtav();
      Postavke.bodovi += 30;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }

    if (p.touching(Postavke.pauk)) {
      p.stop();
      Postavke.pauk.mrtav();
      Postavke.bodovi += 40;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }

    if (p.touching(Postavke.kostur)) {
      p.stop();
      Postavke.kostur.mrtav();
      Postavke.bodovi += 50;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }
  }




  if (Postavke.ninja.touching(Postavke.strelica)) {
   Postavke.noviLevel3();
  }

  Postavke.zeleni_s.kretanje();


  Postavke.zuti_s.kretanje();

  Postavke.pauk.kretanje();

  Postavke.kostur.kretanje();


  if (Postavke.zeleni_s.touching(Postavke.ninja)) {
    if (Postavke.zeleni_s.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;

    }

  }

  if (Postavke.zuti_s.touching(Postavke.ninja)) {
    if (Postavke.zuti_s.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;

    }
  }

  if (Postavke.pauk.touching(Postavke.ninja)) {
    if (Postavke.pauk.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;

    }
  }

  if (Postavke.kostur.touching(Postavke.ninja)) {
    if (Postavke.kostur.visible == true) {
      Povratak()
      Postavke.ninja.zivot--;

    }
  }

  function Povratak() {
    Postavke.ninja.x = 100;
    Postavke.ninja.y = 448;
  }

  if (Postavke.ninja.y == 608) {
    Povratak()
    Postavke.ninja.zivot--;
  }

  if (Postavke.ninja.touching(Postavke.plavip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot++;
      Postavke.plavip.visible = false;
      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
    }
  }

  if (Postavke.ninja.touching(Postavke.crvenip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot = 3;
      Postavke.crvenip.visible = false;

      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);

    }
  }

  GameSettings.output("Broj života: " + Postavke.ninja.zivot + "\nBodovi: " + Postavke.bodovi, true);

  

}

function level3(){

  function Povratak() {
    Postavke.ninja.x = 1000;
    Postavke.ninja.y = 512;

  }
  if (SENSING.right.active) {
    Postavke.ninja.moveRight();
  }

  if (SENSING.left.active) {
    Postavke.ninja.moveLeft();
  }
  if (SENSING.up.active) {
    Postavke.ninja.jump();
  }

  if (SENSING.keyD.active) {
    if (!Postavke.ninja.puca) {
      Postavke.ninja.puca = true;
      Postavke.ninja.pucaj();
    }
  }
  else {
    Postavke.ninja.puca = false;
  }

  for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
  }

  Postavke.ashtar.kretanje();

  if (Postavke.ashtar.touching(Postavke.ninja)) {
    if (Postavke.ashtar.visible == true) {
      Povratak();
      Postavke.ninja.zivot--;
    }
  }
  
  for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
    if (p.touching(Postavke.ashtar)) {
      p.stop();
      Postavke.ashtar.zivot--;
      Postavke.bodovi += 50;
      if(Postavke.ashtar.zivot==0)
        {
          Postavke.ashtar.mrtav();
          ENGINE.stop();
          alert("Pobijedili ste!")

        }
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
      break;
    }
  }


  if (Postavke.ninja.touching(Postavke.plavip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot++;
      Postavke.plavip.visible = false;
      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);
    }
  }

  if (Postavke.ninja.touching(Postavke.crvenip)) {
    if (Postavke.ninja.zivot <= 2) {
      Postavke.ninja.zivot = 3;
      Postavke.crvenip.visible = false;

      Postavke.bodovi += 10;
      GameSettings.output("Bodovi: " + Postavke.bodovi, true);

    }
  }

  GameSettings.output("Broj života: " + Postavke.ninja.zivot + "\nBodovi: " + Postavke.bodovi + "\nAshtar: " + Postavke.ashtar.zivot, true);

}