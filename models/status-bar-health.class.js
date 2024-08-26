class StatusBarHealth extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value and updates the image based on the percentage.
   *
   * This method updates the `percentage` property and selects the corresponding image from the `IMAGES` array
   * using the index resolved by the `resolveImageIndex` method. The selected image is then set to the `img` property.
   *
   * @param {number} percentage - The percentage value to set. Should be between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Determines the index of the image to use based on the current percentage value.
   *
   * This method calculates the index of the image from the `IMAGES` array that corresponds to the `percentage` value.
   * The index is chosen based on predefined percentage ranges:
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
