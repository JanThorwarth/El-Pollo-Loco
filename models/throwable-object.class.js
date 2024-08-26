class ThrowableObject extends MoveableObject {
  throwBottles = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  bottleSplashImg = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y, CharacterDirection) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.throwBottles);
    this.loadImages(this.bottleSplashImg);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.visible = true;
    this.CharacterDirection = CharacterDirection;
    this.throw();
  }

  /**
   * Throws a bottle by setting the vertical speed and initiating throw gravity.
   *
   * This method sets the initial vertical speed for the bottle throw and starts the throw animation.
   * It also continuously updates the bottle's position based on the character's direction and checks for collisions with the ground.
   */
  throw() {
    this.speedY = 30;
    this.throwGravity();
    this.bottleThrow = setInterval(() => {
      if (this.CharacterDirection) {
        this.playAnimation(this.throwBottles);
        this.x -= 20;
      } else {
        this.playAnimation(this.throwBottles);
        this.x += 20;
      }
      this.thrownBottleCollisionWithGround();
    }, 1000 / 20);
  }

  /**
   * Plays the splash animation for the thrown bottle and stops further throwing actions.
   *
   * This method plays a splash sound and displays the splash animation of the bottle. It stops the bottle throw interval and updates the image for the splash effect.
   */
  splashAnimation() {
    splash_sound.play();
    clearInterval(this.bottleThrow);
    this.splashAnimationCompleted = false;
    const interval = setInterval(() => {
      if (this.currentImage >= this.bottleSplashImg.length) {
        clearInterval(interval);
        this.currentImage = this.bottleSplashImg.length - 1;
        this.img = this.ImageCache[this.bottleSplashImg[this.currentImage]];
        this.splashAnimationCompleted = true;
        this.playEndAnimationOnce(this.bottleSplashImg);
      }
    }, 1000 / 25);
  }

  /**
   * Plays the end animation once for the given array of images.
   *
   * This method loads the images from the given array and plays each image in sequence to show the end animation.
   * After finishing the animation, it moves the bottle off-screen.
   *
   * @param {Array<string>} array - Array of image paths to be used for the end animation.
   */
  playEndAnimationOnce(array) {
    this.loadImages(array);
    let i = 0;
    let splashInterval = setInterval(() => {
      this.playAnimation([array[i]]);
      i++;
      if (i >= array.length) {
        clearInterval(splashInterval);
        this.y = +1000;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the thrown bottle has collided with the ground and handles the collision.
   *
   * This method updates the position of the thrown bottle if it has collided with the ground and stops the throw and gravity intervals.
   * It then initiates the splash animation.
   *
   * @param {number} gravity - The gravity interval ID to be cleared on collision.
   */
  thrownBottleCollisionWithGround(gravity) {
    if (this.y >= 380) {
      this.y = 380;
      this.speedY = 0;
      clearInterval(this.bottleThrow);
      clearInterval(gravity);
      this.splashAnimation();
    }
  }

  /**
   * Applies gravity to the thrown bottle, updating its position based on vertical speed and acceleration.
   *
   * This method sets up a gravity interval to simulate the gravitational pull on the bottle, affecting its vertical movement until it hits the ground.
   */
  throwGravity() {
    let gravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.thrownBottleCollisionWithGround(gravity);
      }
    }, 1000 / 30);
  }
}
