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

  /**
   * Increases the percentage value by 10 if it is less than 100 and updates the image.
   *
   * This method increments the `percentage` property by 10 units, ensuring it does not exceed 100. It then
   * updates the image (`img`) to reflect the new percentage value by calling `setPercentage`.
   *
   * @see #setPercentage
   */
  addCoin() {
    if (this.percentage < 100) {
      this.percentage += 10; // Increases the percentage by 10 for each coin collected
      this.setPercentage(this.percentage); // Updates the image based on the new percentage value
    }
  }
}
