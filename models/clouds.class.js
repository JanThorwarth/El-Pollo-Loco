class Cloud extends MoveableObject {
  width = 500;
  height = 250;
  speed = 0.15;
  y = 0;
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/2.png");

    this.x = Math.random() * 500;
    this.animate();
  }
  animate() {
    this.moveLeft();
  }
}
