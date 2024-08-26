let canvas;
let world = null;
let keyboard = new Keyboard();
let isMuted = false;
let music_sound = new Audio('audio/music.mp3');
let walking_sound = new Audio('audio/walking.mp3');
let hurt_sound = new Audio('audio/hurt.mp3');
let jump_sound = new Audio('audio/jump.mp3');
let snoring_sound = new Audio('audio/snoring.mp3');
let chicken_sound = new Audio('audio/chicken.mp3');
let pepe_death_sound = new Audio('audio/pepe-death.mp3');
let chicken_death_sound = new Audio('audio/chicken-death.mp3');
let lost_sound = new Audio('audio/lost.mp3');
let coin_sound = new Audio('audio/coin.mp3');
let bottle_sound = new Audio('audio/bottle.mp3');
let splash_sound = new Audio('audio/splash.mp3');
let endboss_hurt_sound = new Audio('audio/endboss_hurt.mp3');
let endboss_dead_sound = new Audio('audio/endboss_dead.mp3');
let endboss_sound = new Audio('audio/endboss.mp3');
let win_sound = new Audio('audio/win.mp3');

/**
 * Toggles the in-game sound on or off.
 */
function volumeOnOffIngame() {
  isMuted = !isMuted;

  music_sound.muted = isMuted;
  walking_sound.muted = isMuted;
  hurt_sound.muted = isMuted;
  jump_sound.muted = isMuted;
  snoring_sound.muted = isMuted;
  chicken_sound.muted = isMuted;
  pepe_death_sound.muted = isMuted;
  chicken_death_sound.muted = isMuted;
  lost_sound.muted = isMuted;
  coin_sound.muted = isMuted;
  bottle_sound.muted = isMuted;
  splash_sound.muted = isMuted;
  endboss_hurt_sound.muted = isMuted;
  endboss_dead_sound.muted = isMuted;
  win_sound.muted = isMuted;
  endboss_sound.muted = isMuted;
  changeVolumeLogo();
}

/**
 * Updates the volume icon in the UI.
 */
function changeVolumeLogo() {
  let volume = document.getElementById('volumeIngame');
  if (isMuted) {
    volume.src = 'img/icons/volume-off.png';
  } else {
    volume.src = 'img/icons/volume-on.png';
  }
}

/**
 * Plays the background music with a specific volume and loops it.
 */
function playMusic() {
  music_sound.volume = 0.05;
  music_sound.loop = true;
  music_sound.play();
}

/**
 * Displays the game canvas and hides the start screen.
 */
function hideStartscreenFromStartGame() {
  canvas = document.getElementById('canvas');
  canvas.classList.remove('d-none');
  canvas.style.display = 'block';
  document.getElementById('gameDiv').classList.remove('d-none');
  document.getElementById('start').style.display = 'none';
  document.getElementById('soundDivIngame').classList.remove('d-none');
}

/**
 * Initializes the game, plays music, and starts the world.
 */
function startGame() {
  initLevel();
  playMusic();
  hideStartscreenFromStartGame();
  world = new World(canvas, keyboard);
}

/**
 * Checks the screen width and displays or hides the turn screen prompt accordingly.
 */
function checkScreenWidth() {
  let turnScreenDiv = document.getElementById('turnScreen');
  if (window.innerWidth <= 600) {
    turnScreenDiv.style.display = 'flex';
  } else {
    turnScreenDiv.style.display = 'none';
  }
}

window.addEventListener('resize', checkScreenWidth);
window.addEventListener('load', checkScreenWidth);

/**
 * Hides the game canvas and shows the home screen.
 */
function hideCanvasFromHomescreen() {
  document.getElementById('gameDiv').classList.add('d-none');
  document.getElementById('soundDivIngame').classList.add('d-none');
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('endscreenWin').style.display = 'none';
  document.getElementById('start').style.display = 'block';
}

/**
 * Returns to the home screen and resets the game.
 */
function homescreen() {
  clearAllIntervals();
  hideCanvasFromHomescreen();
  world = new World(canvas, keyboard);
}

/**
 * Prepares the canvas for restarting the game.
 */
function hideCanvasFromRestart() {
  document.getElementById('gameDiv').classList.remove('d-none');
  document.getElementById('soundDivIngame').classList.remove('d-none');
  document.getElementById('endscreen').style.display = 'none';
  document.getElementById('endscreenWin').style.display = 'none';
  document.getElementById('start').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
}

/**
 * Restarts the game, resets the world, and resumes the music.
 */
function restart() {
  clearAllIntervals();
  endboss_sound.pause();
  music_sound.play();
  hideCanvasFromRestart();
  initLevel();
  world = new World(canvas, keyboard);
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Closes the impressum (legal notice) dialog.
 */
function closeImpressum() {
  let impressumDiv = document.getElementById('impressumDiv');
  impressumDiv.classList.add('d-none');
}

/**
 * Opens the impressum (legal notice) dialog.
 */
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
