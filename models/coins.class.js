class Coins extends DrawableObject {
  width = 150;
  height = 150;
  coinsImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor() {
    super();
    this.loadImages(this.coinsImg);
    this.loadImage(this.coinsImg[0]);

    this.x = 200 + Math.random() * 500;
    this.y = 50 + Math.random() * 300;
    this.animate();
  }

  offset = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  };

  animate() {
    setInterval(() => {
      this.playAnimation(this.coinsImg);
    }, 200);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.ImageCache[images[i]];
    this.currentImage++;
  }
}
