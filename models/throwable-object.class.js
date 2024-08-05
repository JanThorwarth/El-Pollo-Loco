class ThrowableObject extends MoveableObject {
  throwBottles = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.otherDirection = otherDirection;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 1000 / 40);
  }
}
