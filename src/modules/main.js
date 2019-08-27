const htmlElements = {
  onOff: document.querySelector(".checkbox"),
  audioFileSelect: document.querySelector(".audiofile"),
  platter: document.querySelector(".platter"),
  output: document.querySelector(".output"),
  toneArm: document.querySelector(".toneArmTwo"),
  toneBase: document.querySelector(".toneBase")
};
let audioValue = htmlElements.audioFileSelect.value;
let audio, time;
let onoffswitch = "running";
let angle = 0;

htmlElements.onOff.addEventListener("click", onoff);
htmlElements.audioFileSelect.addEventListener("change", () => {
  if (onoffswitch !== "running") {
    off();
  }
  audioValue = htmlElements.audioFileSelect.value;
  audio = new Audio(audioValue);
  toggleButton();
});

function onoff() {
  if (onoffswitch === "running") {
    htmlElements.platter.classList.add("platter-spin");
    //htmlElements.toneBase.classList.add("tonearm-movement");
    audio.play();
    onoffswitch = "off";
    time = setInterval(updateTrackTime, 10);
    rotate();
  } else {
    off();
  }
  audio.onended = function() {
    off();
  };
}

function off() {
  htmlElements.platter.classList.remove("platter-spin");
  //htmlElements.toneBase.classList.remove("tonearm-movement");
  audio.pause();
  onoffswitch = "running";
  htmlElements.onOff.checked = false;
  clearInterval(time);
}

//disabled buttons when audio file is not selected
function toggleButton() {
  if (audioValue !== "not selected") {
    htmlElements.onOff.removeAttribute("disabled");
  } else {
    htmlElements.onOff.setAttribute("disabled", "true");
  }
}
toggleButton();

function updateTrackTime() {
  const currTime = audio.currentTime;
  let millisec = parseInt(currTime * 1000) % 1000;
  let seconds = parseInt(currTime % 60);
  let minutes = parseInt((currTime / 60) % 60);
  let hours = parseInt(currTime / 3600);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (millisec < 10) {
    millisec = `00${millisec}`;
  }
  if (millisec < 100) {
    millisec = `0${millisec}`;
  }
  if (millisec === 1000) {
    millisec = `000`;
  }

  htmlElements.output.innerText = `${hours}:${minutes}:${seconds}:${millisec}`;
}

function rotate() {
  //const finalAngle = angle + 100;
  htmlElements.toneBase.setAttribute("style", "transform: rotate(25deg)");
}
