class Bottles extends DrawableObject {
  y = 0;
  width = 70;
  height = 70;
  bottles = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  offset = {
    top: 10,
    bottom: 10,
    left: 20,
    right: 20,
  };

  constructor() {
    super();
    this.loadImage(this.bottles[0]);
    this.loadImages(this.bottles);
    this.x = 200 + Math.random() * 500;
    this.y = 30;
    this.animate();
  }

  /**
   * Animates the object's bottle collection by cycling through images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.bottles);
    }, 500);
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
