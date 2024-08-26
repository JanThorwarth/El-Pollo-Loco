class Charakter extends MoveableObject {
  speed = 10;
  y = 50;
  energy = 100;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  offset = {
    top: 100,
    bottom: 10,
    left: 20,
    right: 20,
  };

  world;
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animateMoving();
    this.animateIdle();
  }
  isDeadAlreadyHandled = false;

  characterMovingRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.lastKeyPressTime = Date.now();
      this.otherDirection = false;
      walking_sound.play();
    }
  }

  characterMovingLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.lastKeyPressTime = Date.now();
      this.otherDirection = true;
      walking_sound.play();
    }
  }

  characterJumping() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      jump_sound.volume = 0.1;
      jump_sound.play();
    }
  }

  showEndscreenDeath() {
    document.getElementById('soundDivIngame').classList.add('d-none');
    document.getElementById('gameDiv').classList.add('d-none');
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endscreen').style.display = 'block';
  }

  characterDeadSounds() {
    pepe_death_sound.volume = 0.5;
    pepe_death_sound.play();
    lost_sound.volume = 0.5;
    lost_sound.play();
    music_sound.pause();
  }

  characterHurtSounds() {
    hurt_sound.volume = 0.2;
    hurt_sound.play();
  }

  characterIsMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  characterDead() {
    this.isDeadAlreadyHandled = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.showEndscreenDeath();
    this.characterDeadSounds();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        if (!this.isDeadAlreadyHandled) {
          this.characterDead();
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.characterHurtSounds();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.characterIsMoving()) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  animateMoving() {
    setInterval(() => {
      walking_sound.pause();
      this.characterMovingRight();
      this.characterMovingLeft();
      this.characterJumping();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 30);
    this.animate();
  }

  characterSnoringSounds() {
    snoring_sound.volume = 0.1;
    snoring_sound.play();
  }

  animateIdle() {
    setInterval(() => {
      let timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
      if (timeSinceLastKeyPress > 20000) {
        this.characterSnoringSounds();
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (timeSinceLastKeyPress > 40) {
        snoring_sound.pause();
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 200);
  }
}
