class Chicken extends MoveableObject {
  y = 350;
  height = 70;
  width = 70;
  CHICKEN_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadChickenImages(this.CHICKEN_WALKING);

    this.speed = 0.15 + Math.random() * 0.2;

    this.x = 200 + Math.random() * 500;

    this.animate();
    this.moveLeft();
    this.walking();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.5;
    }, 1000 / 60);
  }
  walking() {
    setInterval(() => {
      let i = this.currentImage % this.CHICKEN_WALKING.length;
      let path = this.CHICKEN_WALKING[i];
      this.img = this.ChickenCache[path];
      this.currentImage++;
    }, 100);
  }
}
