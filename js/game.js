let canvas;
let world = null;
let keyboard = new Keyboard();

function startGame() {
  initLevel();
  canvas = document.getElementById('canvas');
  startscreen = document.getElementById('start');
  world = new World(canvas, keyboard);

  startscreen.style.display = 'none';
  canvas.style.display = 'block';
}

function homescreen() {
  clearAllIntervals();

  endscreen = document.getElementById('endscreen');
  endscreenWin = document.getElementById('endscreenWin');
  startscreen = document.getElementById('start');

  startscreen.style.display = 'block';
  endscreen.style.display = 'none';
  endscreenWin.style.display = 'none';

  world = new World(canvas, keyboard);
}

function restart() {
  clearAllIntervals();
  canvas = document.getElementById('canvas');
  endscreen = document.getElementById('endscreenWin');
  startscreen = document.getElementById('start');
  endscreen = document.getElementById('endscreen');

  endscreen.style.display = 'none';
  startscreen.style.display = 'none';
  endscreenWin.style.display = 'none';
  canvas.style.display = 'block';
  initLevel();
  world = new World(canvas, keyboard);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function volumeOnOff() {
  let volume = document.getElementById('volume');
  if (volume.src.endsWith('img/icons/volume-on.png')) {
    volume.src = 'img/icons/volume-off.png';
  } else {
    volume.src = 'img/icons/volume-on.png';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
