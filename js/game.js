let canvas;
let world = null;
let keyboard = new Keyboard();
let music_sound = new Audio('audio/music.mp3');

function startGame() {
  initLevel();
  music_sound.volume = 0.05;
  music_sound.play();
  canvas = document.getElementById('canvas');
  gameDiv = document.getElementById('gameDiv');
  startscreen = document.getElementById('start');

  soundDivIngame = document.getElementById('soundDivIngame');
  world = new World(canvas, keyboard);
  gameDiv.classList.remove('d-none');
  soundDivIngame.classList.remove('d-none');

  startscreen.style.display = 'none';
  canvas.classList.remove('d-none');
  canvas.style.display = 'block';
}

function checkScreenWidth() {
  const turnScreenDiv = document.getElementById('turnScreen');

  if (window.innerWidth <= 600) {
    turnScreenDiv.style.display = 'flex';
  } else {
    turnScreenDiv.style.display = 'none';
  }
}

window.addEventListener('resize', checkScreenWidth);
window.addEventListener('load', checkScreenWidth);

function homescreen() {
  clearAllIntervals();
  gameDiv = document.getElementById('gameDiv');
  soundDivIngame = document.getElementById('soundDivIngame');
  endscreen = document.getElementById('endscreen');
  endscreenWin = document.getElementById('endscreenWin');
  startscreen = document.getElementById('start');

  gameDiv.classList.add('d-none');
  soundDivIngame.classList.add('d-none');
  startscreen.style.display = 'block';
  endscreen.style.display = 'none';
  endscreenWin.style.display = 'none';

  world = new World(canvas, keyboard);
}

function restart() {
  clearAllIntervals();
  gameDiv = document.getElementById('gameDiv');
  canvas = document.getElementById('canvas');
  endscreen = document.getElementById('endscreenWin');
  startscreen = document.getElementById('start');
  endscreen = document.getElementById('endscreen');
  soundDivIngame = document.getElementById('soundDivIngame');

  gameDiv.classList.remove('d-none');
  soundDivIngame.classList.remove('d-none');
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

function volumeOnOffIngame() {
  let volume = document.getElementById('volumeIngame');
  if (volume.src.endsWith('img/icons/volume-on.png')) {
    volume.src = 'img/icons/volume-off.png';
  } else {
    volume.src = 'img/icons/volume-on.png';
  }
}
function closeImpressum() {
  let impressumDiv = document.getElementById('impressumDiv');
  impressumDiv.classList.add('d-none');
}

function impressum() {
  let impressumDiv = document.getElementById('impressumDiv');
  impressumDiv.classList.remove('d-none');
}

document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById('leftBtn').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('rightBtn').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('upBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById('upBtn').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.D = true;
});

document.getElementById('throwBtn').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.D = false;
});

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
