class StatusBarBottle extends DrawableObject {
  bottleCount = 0;
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 480;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(this.percentage);
  }

  /**
   * Sets the percentage value and updates the image based on the percentage.
   *
   * This method updates the `percentage` property and sets the image (`img`) to the one corresponding
   * to the current percentage value. The image is selected from the `IMAGES` array using the index resolved
   * by the `resolveImageIndex` method.
   *
   * @param {number} percentage - The percentage value to set. Should be between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value.
   *
   * This method determines the index of the image to be used based on the `percentage` property. The index is
   * chosen based on predefined ranges of percentage values:
   * @returns {number} The index of the image to use based on the percentage.
   */
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

  /**
   * Increases the percentage value by 10 if it is less than 100 and updates the image.
   *
   * This method increments the `percentage` property by 10 units, ensuring it does not exceed 100. It then
   * updates the image (`img`) to reflect the new percentage value by calling `setPercentage`.
   */
  addBottle() {
    if (this.percentage < 100) {
      this.percentage += 10;
      this.setPercentage(this.percentage);
    }
  }
}
