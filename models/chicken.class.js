class Chicken extends MoveableObject {
  y = 350;
  height = 70;
  width = 70;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.isDead = false;
    this.isLying = false;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.2 + Math.random() * 0.5;
    this.x = 200 + Math.random() * 2000;
    this.animate();
  }

  /**
   * Plays the chicken's death sound at a lower volume.
   */
  chickenDeathSound() {
    chicken_death_sound.volume = 0.2;
    chicken_death_sound.play();
  }

  /**
   * Handles the chicken's death sequence.
   * Sets the chicken's status to dead, loads the dead image, and plays the death sound.
   */
  die() {
    this.isDead = true;
    this.loadImage(this.IMAGES_DEAD[0]);
    this.chickenDeathSound();
  }

  /**
   * Checks if the chicken is dead.
   * @returns {boolean} True if the chicken is dead, otherwise false.
   */
  isDead() {
    return this.isDead;
  }

  /**
   * Animates the chicken's movement and walking animation.
   * Moves the chicken to the left if it's not dead, and plays the walking animation.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
