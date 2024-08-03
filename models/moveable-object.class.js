class MoveableObject {
  x = 120;
  y = 160;
  img;
  height = 270;
  width = 150;
  currentImage = 0;
  speed = 0.15;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  otherDirection = false;
  lastHit = 0;
  ImageCache = {};

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 155;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawFrame(ctx) {
    if (this instanceof Charakter || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = 'transform: scaleX(-1)';
      this.ImageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  jump() {
    this.speedY = 30;
  }
  moveRight() {
    this.x += this.speed;

    this.walking_sound.play();
  }
}
