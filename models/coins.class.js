class Coins extends DrawableObject {
  width = 150;
  height = 150;
  coinsImg = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
  coin_sound = new Audio('audio/coin.mp3');

  constructor() {
    super();
    this.loadImages(this.coinsImg);
    this.loadImage(this.coinsImg[0]);
    this.x = 200 + Math.random() * 500;
    this.y = 50 + Math.random() * 300;
    this.animate();
  }

  offset = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

  /**
   * animates the coin images
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.coinsImg);
    }, 200);
  }

  /**
   * Plays an animation by cycling through an array of images.
   *
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.ImageCache[images[i]];
    this.currentImage++;
  }
}
