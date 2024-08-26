class Endboss extends MoveableObject {
  y = 50;
  height = 400;
  width = 250;
  speed = 8;
  energy = 200;
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  offset = {
    top: 40,
    bottom: 0,
    left: 20,
    right: 10,
  };
  hadFirstContact = false;
  isAttacking = false;
  currentAnimation = null;
  endAnimation = false;
  endboss_hurt_sound = new Audio('audio/endboss_hurt.mp3');
  endboss_dead_sound = new Audio('audio/endboss_dead.mp3');
  endboss_sound = new Audio('audio/endboss.mp3');
  win_sound = new Audio('audio/win.mp3');
  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 2550;
    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (world.character.x > 2050 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
        this.endboss_sound.volume = 0.2;
        this.endboss_sound.play();
        music_sound.pause();
      }

      if (this.hadFirstContact && !this.isDead() && !this.isAttacking) {
        if (i < 10) {
          this.setCurrentAnimation('ALERT');
          this.playAnimation(this.IMAGES_ALERT);
        } else {
          this.setCurrentAnimation('WALKING');
          this.playAnimation(this.IMAGES_WALKING);
          this.moveLeft();
        }
        i++;
      }
    }, 100);

    setInterval(() => {
      if (this.isDead() && !this.endAnimation) {
        this.setCurrentAnimation('DEAD');
        this.playAnimation(this.IMAGES_DEAD);
        this.endboss_dead_sound.play();

        setTimeout(() => {
          this.endAnimation = true;
          document.getElementById('canvas').style.display = 'none';
          document.getElementById('endscreenWin').style.display = 'block';
          document.getElementById('soundDivIngame').classList.add('d-none');
          document.getElementById('gameDiv').classList.add('d-none');
          this.snoring_sound.pause();
          this.endboss_sound.pause();
          this.win_sound.volume = 0.5;
          this.win_sound.play();
        }, this.IMAGES_DEAD.length * 500);
      } else if (this.isHurt() && !this.isAttacking) {
        this.setCurrentAnimation('HURT');
        this.playAnimation(this.IMAGES_HURT);
        this.endboss_hurt_sound.play();
      }
    }, 100);
  }

  attack() {
    if (!this.isAttacking && this.currentAnimation !== 'DEAD' && this.currentAnimation !== 'HURT') {
      this.isAttacking = true;
      this.setCurrentAnimation('ATTACK');
      this.playAnimation(this.IMAGES_ATTACK);

      setTimeout(() => {
        this.isAttacking = false;
        this.setCurrentAnimation(null);
      }, 100);
    }
  }

  setCurrentAnimation(animation) {
    this.currentAnimation = animation;
  }
}
