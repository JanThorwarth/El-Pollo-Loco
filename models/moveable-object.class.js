class MoveableObject {
  x = 120;
  y = 160;
  img;
  height = 270;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}

  moveLeft() {}
}
