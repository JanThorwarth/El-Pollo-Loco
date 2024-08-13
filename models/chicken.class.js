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

  die() {
    this.isDead = true;
    this.loadImage(this.IMAGES_DEAD[0]);
  }
  isDead() {
    return this.isDead;
  }

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
    }, 200);
  }
}
