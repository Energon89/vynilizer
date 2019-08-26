import { Stopwatch } from "./stopwatch.js";

const stopwatch = new Stopwatch();
//stopwatch.init();

const htmlElements = {
  onOff: document.querySelector(".switch"),
  audioFileSelect: document.querySelector(".audiofile")
};
let audioValue = htmlElements.audioFileSelect.value;
let audio;

htmlElements.onOff.addEventListener("click", onoff);
htmlElements.audioFileSelect.addEventListener("change", () => {
  if (onoffswitch !== "running") {
    off();
  }
  audioValue = htmlElements.audioFileSelect.value;
  audio = new Audio(audioValue);
  stopwatch.resetTimer();
});

//global var//
var armmovex = 530;
var armmovey = 450;
var switchx = 650;
var updown1 = 0;
var updown2 = 600;
var lighton = "rgba(255,0,0,0)";

//continuously draw player//
setInterval(function draw() {
  var canvas = document.querySelector(".recordplayer");

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    //base//
    ctx.beginPath();
    ctx.moveTo(110, 100);
    ctx.lineTo(690, 100);
    ctx.quadraticCurveTo(700, 100, 700, 110);
    ctx.lineTo(700, 490);
    ctx.quadraticCurveTo(700, 500, 690, 500);
    ctx.lineTo(110, 500);
    ctx.quadraticCurveTo(100, 500, 100, 490);
    ctx.lineTo(100, 110);
    ctx.quadraticCurveTo(100, 100, 110, 100);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();

    //record//
    ctx.beginPath();
    ctx.arc(300, 300, 180, 0, Math.PI * 2, true);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    //groove variables//
    var gradient = ctx.createLinearGradient(0, 0, updown1, updown2);
    gradient.addColorStop("0", "lightgray");
    gradient.addColorStop(".5", "black");
    gradient.addColorStop("1", "lightgray");

    var newgroove = (ctx.strokeStyle = gradient);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    //grooves//
    ctx.beginPath();
    ctx.arc(300, 300, 165, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(450, 300);
    ctx.arc(300, 300, 150, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(435, 300);
    ctx.arc(300, 300, 135, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(420, 300);
    ctx.arc(300, 300, 120, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(405, 300);
    ctx.arc(300, 300, 105, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(390, 300);
    ctx.arc(300, 300, 90, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(375, 300);
    ctx.arc(300, 300, 75, 0, Math.PI * 2, true);
    newgroove;
    ctx.moveTo(360, 300);
    ctx.arc(300, 300, 60, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();

    //armbase//
    ctx.beginPath();
    ctx.arc(530, 150, 20, 0, Math.PI * 2, true);
    ctx.fill();

    //arm//
    ctx.beginPath();
    ctx.moveTo(530, 150);
    ctx.lineTo(armmovex, armmovey);
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 7;
    ctx.stroke();

    //switch base//
    ctx.beginPath();
    ctx.rect(600, 400, 50, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.moveTo(650, 425);
    ctx.arc(650, 425, 25, 0, Math.PI * 2, true);
    ctx.moveTo(600, 425);
    ctx.arc(600, 425, 25, 0, Math.PI * 2, true);
    ctx.fill();

    //switch//
    ctx.beginPath();
    ctx.arc(switchx, 425, 21, 0, Math.PI * 2, true);
    ctx.fillStyle = "lightgray";
    ctx.fill();

    //text//
    ctx.fillStyle = "black";
    ctx.font = "23px Helvetica";
    ctx.fillText("ON / OFF", 575, 475);

    //light//
    ctx.beginPath();
    ctx.arc(555, 425, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgb(100,0,0)";
    ctx.fill();

    //light on//
    ctx.beginPath();
    ctx.arc(555, 425, 11.5, 0, Math.PI * 2, true);
    ctx.fillStyle = lighton;
    ctx.fill();

    //center//
    ctx.beginPath();
    ctx.arc(300, 300, 8, 0, Math.PI * 2, true);
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.closePath();
  }
}, 30);

//onoff function var//
var onoffswitch = "running";
//var audio = new Audio(audioValue);
var rotate;

function onoff() {
  if (audioValue === "not selected") {
    alert("Please select an audio file first");
    return;
  }
  stopwatch.init();
  if (onoffswitch === "running") {
    armmovex = 400;
    armmovey = 423;
    switchx = 600;
    lighton = "rgba(255,0,0,.5)";
    rotate = setInterval(spin, 300);
    audio.play();
    onoffswitch = "off";
  } else {
    off();
  }
}

function off() {
  armmovex = 530;
  armmovey = 450;
  switchx = 650;
  lighton = "rgba(255,0,0,0)";
  clearInterval(rotate);
  audio.pause();
  onoffswitch = "running";
}

//spin function//
let groovemove = "updown";

function spin() {
  if (groovemove === "updown") {
    updown1 = 600;
    updown2 = 0;
    groovemove = "leftright";
  } else {
    updown1 = 0;
    updown2 = 600;
    groovemove = "updown";
  }
}
