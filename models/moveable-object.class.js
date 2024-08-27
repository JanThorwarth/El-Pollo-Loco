class MoveableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  otherDirection = false;
  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object, causing it to fall if it is not above ground or if it is moving downward.
   * The gravity effect is simulated by continuously adjusting the object's vertical position (`y`) and vertical speed (`speedY`).
   */
  applyGravity() {
    const gravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Checks if the object is above the ground level.
   * If the object is an instance of `ThrowableObject`, it is considered to be above ground.
   * Otherwise, the object's `y` position is compared to a threshold (155) to determine if it is above ground.
   *
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 155;
    }
  }

  /**
   * Checks if the object is falling.
   * An object is considered to be falling if its vertical speed (`speedY`) is negative and its `y` position is below a threshold (158).
   *
   * @returns {boolean} True if the object is falling, false otherwise.
   */
  isFalling() {
    return this.speedY < 0 && this.y < 158;
  }

  /**
   * Checks if the object is colliding with another object.
   * Collision detection is based on the bounding boxes of the two objects.
   *
   * @param {Object} mo - The other object to check for collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy by 5 if it is not falling.
   * Updates the time of the last hit if the object is still alive.
   */
  hit() {
    if (!this.isFalling()) {
      this.energy -= 2;
    }
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  endbossHit() {
    if (!this.isFalling()) {
      this.energy -= 1;
    }
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt.
   * An object is considered hurt if it is not falling and the time since the last hit is less than 1 second.
   *
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    if (!this.isFalling()) {
      let timePassed = new Date().getTime() - this.lastHit;
      timePassed = timePassed / 1000;
      return timePassed < 1;
    }
    return false;
  }

  /**
   * Checks if the object is dead.
   * The object is considered dead if its energy is zero.
   *
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Updates the object's current image based on an array of image paths and increments the image index.
   *
   * @param {string[]} images - An array of image paths to cycle through.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the left by subtracting the object's speed from its x position.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed (`speedY`) to a positive value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Moves the object to the right by adding the object's speed to its x position.
   */
  moveRight() {
    this.x += this.speed;
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
}
