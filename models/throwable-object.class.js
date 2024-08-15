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
    this.CharacterDirection = CharacterDirection;
    this.throw();
    this.splashAnimation();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.CharacterDirection) {
        this.playAnimation(this.throwBottles);
        this.x -= 20;
      } else {
        this.playAnimation(this.throwBottles);
        this.x += 20;
      }
    }, 1000 / 20);
  }
  splashAnimation() {
    setInterval(() => {
      this.playAnimation(this.bottleSplashImg);
    }, 3000);
  }
}
