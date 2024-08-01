class MoveableObject {
  x = 120;
  y = 160;
  img;
  height = 270;
  width = 150;
  currentImage = 0;
  speed = 0.15;
  ImageCache = {};
  ChickenCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }

  loadChickenImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ChickenCache[path] = img;
    });
  }

  moveRight() {}
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
