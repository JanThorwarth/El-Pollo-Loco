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

  thrownBottleCollisionWithGround(gravity) {
    if (this.y >= 380) {
      this.y = 380;
      this.speedY = 0;
      clearInterval(this.bottleThrow);
      clearInterval(gravity);
      this.splashAnimation();
    }
  }

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
