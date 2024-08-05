class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 160;
  height = 270;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  drawFrame(ctx) {
    if (this instanceof Charakter) {
      // Rahmen für Charakter anpassen
      let frameOffsetX = 10; // Horizontaler Versatz
      let frameOffsetY = 80; // Vertikaler Versatz nach oben
      let frameWidth = this.width - 20; // Rahmenbreite reduzieren
      let frameHeight = this.height - 80; // Rahmenhöhe reduzieren

      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x + frameOffsetX, this.y + frameOffsetY, frameWidth, frameHeight);
      ctx.stroke();
    } else if (this instanceof Coins) {
      // Rahmen für Coins anpassen
      let frameOffsetX = 30; // Horizontaler Versatz
      let frameOffsetY = 30; // Vertikaler Versatz
      let frameWidth = this.width - 60; // Rahmenbreite reduzieren
      let frameHeight = this.height - 60; // Rahmenhöhe reduzieren

      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x + frameOffsetX, this.y + frameOffsetY, frameWidth, frameHeight);
      ctx.stroke();
    } else if (this instanceof Chicken || this instanceof Bottles) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
