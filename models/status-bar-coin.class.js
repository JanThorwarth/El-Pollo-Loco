class StatusBarCoin extends DrawableObject {
  coinCount = 0;
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 255;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage <= 20) {
      return 1;
    } else if (this.percentage <= 40) {
      return 2;
    } else if (this.percentage <= 60) {
      return 3;
    } else if (this.percentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }

  addCoin() {
    if (this.percentage < 100) {
      this.percentage += 10; // Erhöhe die Prozentzahl um 20 für jeden Coin
      this.setPercentage(this.percentage); // Aktualisiere das Bild basierend auf der neuen Prozentzahl
    }
  }
}
