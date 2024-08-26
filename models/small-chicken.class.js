class SmallChicken extends MoveableObject {
  y = 370;
  height = 50;
  width = 50;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.isDead = false;
    this.isLying = false;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.2 + Math.random() * 0.5;
    this.x = 200 + Math.random() * 2000;
    this.animate();
  }

  /**
   * Handles the animation and movement of the object.
   *
   * This method sets up two intervals:
   * 1. Moves the object to the left if it is not dead, updating the position at a frame rate of 30 FPS.
   * 2. Plays the walking animation if the object is not dead, updating the animation frame at a rate of 5 FPS.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 30);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Marks the object as dead and loads the image representing the dead state.
   *
   * This method sets the `isDead` property to `true` and loads the first image from the `IMAGES_DEAD` array
   * to represent the object's dead state.
   */
  die() {
    this.isDead = true;
    this.loadImage(this.IMAGES_DEAD[0]);
  }
}
