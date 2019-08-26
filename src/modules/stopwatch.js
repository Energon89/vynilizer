const htmlElements = {
  output: document.querySelector(".output")
};

let startTime = 0;
let time, hours, minutes, seconds, millisec;
let isRunning = false;

function Stopwatch() {}

Stopwatch.prototype.init = function() {
  if (!isRunning) {
    isRunning = true;
    startTimer(startTime);
  } else {
    clearInterval(time);
    isRunning = false;
  }
};

function startTimer(duration) {
  const start = new Date().getTime();

  time = setInterval(function() {
    const difference = duration + Math.round(new Date().getTime() - start);

    millisec = parseInt(difference) % 1000;
    seconds = parseInt((difference / 1000) % 60);
    minutes = parseInt((difference / 1000 / 60) % 60);
    hours = parseInt(difference / 1000 / 3600);

    startTime =
      hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000 + millisec;

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
  }, 10);
}

Stopwatch.prototype.resetTimer = function() {
  clearInterval(time);
  isRunning = false;
  startTime = 0;
  htmlElements.output.innerText = "00:00:00:000";
};

export { Stopwatch };
