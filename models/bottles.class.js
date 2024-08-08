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
    left: 10,
    right: 10,
  };

  constructor() {
    super();
    this.loadImages(this.bottles);
    this.loadImage(this.bottles[0]); // Setze das erste Bild als Standard

    this.x = 200 + Math.random() * 500; // Zufällige Position
    this.y = 30;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.bottles);
    }, 500);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // Zyklisch durch die Bilder gehen
    this.img = this.ImageCache[images[i]];
    this.currentImage++;
  }
}
