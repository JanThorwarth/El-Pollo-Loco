class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 160;
  height = 270;
  width = 150;
  visible = true;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = 'transform: scaleX(-1)';
      this.ImageCache[path] = img;
    });
  }
}
