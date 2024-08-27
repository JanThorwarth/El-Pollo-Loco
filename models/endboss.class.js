class Endboss extends MoveableObject {
  y = 50;
  height = 400;
  width = 250;
  speed = 8;
  energy = 500;
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
    top: 60,
    bottom: 0,
    left: 20,
    right: 10,
  };
  hadFirstContact = false;
  isAttacking = false;
  currentAnimation = null;
  endAnimation = false;

  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2550;
    this.animateContact();
    this.animateDeath();
  }

  /**
   * Checks if the character has made first contact with the endboss.
   *
   * @returns {boolean} True if the character's x position is greater than 2050 and the endboss has not had first contact yet.
   */
  characterFirstContactWithEndboss() {
    return world.character.x > 2050 && !this.hadFirstContact;
  }

  /**
   * Plays the endboss sound at a lower volume and pauses the background music.
   */
  endbossSound() {
    endboss_sound.volume = 0.1;
    endboss_sound.play();
    music_sound.pause();
  }

  /**
   * Checks if the endboss has had its first contact with the character and is alive and not attacking.
   *
   * @returns {boolean} True if the endboss has had first contact, is not dead, and is not attacking.
   */
  firstContactEndbossAndAlive() {
    return this.hadFirstContact && !this.isDead() && !this.isAttacking;
  }

  /**
   * Plays the endboss's death sound at a lower volume.
   */
  endbossDeadSound() {
    endboss_dead_sound.volume = 0.2;
    endboss_dead_sound.play();
  }

  /**
   * Plays the win sound, pauses the snoring and endboss sounds.
   */
  winSound() {
    snoring_sound.pause();
    endboss_sound.pause();
    win_sound.volume = 0.2;
    win_sound.play();
  }

  /**
   * Shows the end screen for a win scenario and hides the game and sound elements.
   */
  showEndscreenWin() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endscreenWin').style.display = 'block';
    document.getElementById('soundDivIngame').classList.add('d-none');
    document.getElementById('gameDiv').classList.add('d-none');
  }

  /**
   * Plays the endboss's hurt sound at a moderate volume.
   */
  endbossHurtSound() {
    endboss_hurt_sound.volume = 0.5;
    endboss_hurt_sound.play();
  }

  /**
   * Handles the animation for the endboss's death or hurt state.
   * Plays the appropriate animation and sounds based on the endboss's state.
   */
  animateDeath() {
    setInterval(() => {
      if (this.isDead() && !this.endAnimation) {
        this.setCurrentAnimation('DEAD');
        this.playAnimation(this.IMAGES_DEAD);
        this.endbossDeadSound();
        setTimeout(() => {
          this.endAnimation = true;
          this.showEndscreenWin();
          this.winSound();
        }, this.IMAGES_DEAD.length * 500);
      } else if (this.isHurt() && !this.isAttacking) {
        this.setCurrentAnimation('HURT');
        this.playAnimation(this.IMAGES_HURT);
        this.endbossHurtSound();
      }
    }, 100);
  }

  /**
   * Handles the animation and behavior when the character first contacts the endboss.
   * Plays the endboss's alert animation and sound, and then transitions to walking if the character is alive.
   */
  animateContact() {
    let i = 0;
    setInterval(() => {
      if (this.characterFirstContactWithEndboss()) {
        i = 0;
        this.hadFirstContact = true;
        this.endbossSound();
      }
      if (this.firstContactEndbossAndAlive()) {
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
  }

  /**
   * Initiates an attack by the endboss if it's not currently attacking and not in a dead or hurt state.
   * Plays the attack animation and sets a timeout to reset the attacking state.
   */
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

  /**
   * Sets the current animation state of the endboss.
   *
   * @param {string|null} animation - The animation state to set. If null, clears the current animation.
   */
  setCurrentAnimation(animation) {
    this.currentAnimation = animation;
  }
}
