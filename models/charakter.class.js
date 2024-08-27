class Charakter extends MoveableObject {
  speed = 10;
  y = 50;
  energy = 70;

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
    right: 30,
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

  /**
   * Handles the character's movement to the right.
   * Plays the walking sound when moving.
   */
  characterMovingRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.lastKeyPressTime = Date.now();
      this.otherDirection = false;
      walking_sound.play();
    }
  }

  /**
   * Handles the character's movement to the left.
   * Plays the walking sound when moving.
   */
  characterMovingLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.lastKeyPressTime = Date.now();
      this.otherDirection = true;
      walking_sound.play();
    }
  }

  /**
   * Handles the character's jumping action.
   * Plays the jump sound when the character jumps.
   */
  characterJumping() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      jump_sound.volume = 0.1;
      jump_sound.play();
    }
  }

  /**
   * Displays the death end screen.
   * Hides the game and sound elements.
   */
  showEndscreenDeath() {
    document.getElementById('soundDivIngame').classList.add('d-none');
    document.getElementById('gameDiv').classList.add('d-none');
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endscreen').style.display = 'block';
  }

  /**
   * Plays sounds when the character dies.
   * Includes pepe's death sound and the lost sound.
   * Pauses the background music.
   */
  characterDeadSounds() {
    pepe_death_sound.volume = 0.5;
    pepe_death_sound.play();
    lost_sound.volume = 0.5;
    lost_sound.play();
    music_sound.pause();
  }

  /**
   * Plays the hurt sound when the character is injured.
   */
  characterHurtSounds() {
    hurt_sound.volume = 0.2;
    hurt_sound.play();
  }

  /**
   * Checks if the character is currently moving (either left or right).
   * @returns {boolean} True if the character is moving, otherwise false.
   */
  characterIsMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Handles the character's death sequence.
   * Plays death animations and sounds, and shows the end screen.
   */
  characterDead() {
    this.isDeadAlreadyHandled = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.showEndscreenDeath();
    this.characterDeadSounds();
  }

  /**
   * Animates the character based on its state (dead, hurt, jumping, or walking).
   */
  animate() {
    let isJumping = false; // Variable, um sicherzustellen, dass die Sprunganimation nur einmal abgespielt wird

    setInterval(() => {
      if (this.isDead()) {
        if (!this.isDeadAlreadyHandled) {
          this.characterDead();
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.characterHurtSounds();
      } else if (this.isAboveGround()) {
        if (!isJumping) {
          // Nur einmalige Ausführung, wenn der Charakter springt
          this.playJumpAnimationOnce();
          isJumping = true; // Markiere, dass die Sprunganimation abgespielt wurde
        }
      } else {
        isJumping = false; // Zurücksetzen, wenn der Charakter wieder auf dem Boden ist
        if (this.characterIsMoving()) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  /**
   * Animates the character's movement (right, left, or jumping).
   * Adjusts the camera position based on the character's location.
   */
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

  /**
   * Plays the snoring sound when the character is idle for a long time.
   */
  characterSnoringSounds() {
    snoring_sound.volume = 0.1;
    snoring_sound.play();
  }

  /**
   * Animates the character when idle.
   * Switches between long idle and idle animations based on the time since the last key press.
   */
  animateIdle() {
    setInterval(() => {
      let timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
      if (timeSinceLastKeyPress > 10000) {
        this.characterSnoringSounds();
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (timeSinceLastKeyPress > 40) {
        snoring_sound.pause();
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 200);
  }

  /**
   * Plays the jump animation once for the given array of images.
   *
   * This method loads the images from the given array and plays each image in sequence to show the jump animation.
   *
   * @param {Array<string>} array - Array of image paths to be used for the end animation.
   */

  playJumpAnimationOnce() {
    this.loadImages(this.IMAGES_JUMPING);
    let i = 0;
    let jumpInterval = setInterval(() => {
      this.playAnimation([this.IMAGES_JUMPING[i]]);
      i++;
      if (i >= this.IMAGES_JUMPING.length) {
        clearInterval(jumpInterval);
      }
    }, 1000 / 10);
  }
}
