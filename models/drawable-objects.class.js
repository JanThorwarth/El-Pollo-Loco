class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 160;
  height = 270;
  width = 150;
  visible = true;

  walking_sound = new Audio('audio/walking.mp3');
  hurt_sound = new Audio('audio/hurt.mp3');
  jump_sound = new Audio('audio/jump.mp3');
  snoring_sound = new Audio('audio/snoring.mp3');
  chicken_sound = new Audio('audio/chicken.mp3');
  pepe_death_sound = new Audio('audio/pepe-death.mp3');
  chicken_death_sound = new Audio('audio/chicken-death.mp3');
  lost_sound = new Audio('audio/lost.mp3');

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  drawFrame(ctx) {
    if (
      this instanceof Charakter ||
      this instanceof Chicken ||
      this instanceof Bottles ||
      this instanceof Coins ||
      this instanceof Endboss ||
      this instanceof SmallChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = '3';
      ctx.strokeStyle = 'red';
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
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
