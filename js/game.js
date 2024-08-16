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

function restart() {
  window.location.reload();
  startGame();
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
