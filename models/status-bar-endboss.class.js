class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  percentage = 100;
  visible = false;
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 480;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the visibility of the object to true.
   *
   * This method makes the object visible by setting the `visible` property to `true`.
   */
  show() {
    this.visible = true;
  }

  /**
   * Sets the visibility of the object to false.
   *
   * This method hides the object by setting the `visible` property to `false`.
   */
  hide() {
    this.visible = false;
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
   * Resolves the index of the image to use based on the current percentage value.
   *
   * This method determines the index of the image to be used based on the `percentage` property. The index is
   * chosen based on predefined ranges of percentage values:
   * @returns {number} The index of the image to use based on the percentage.
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
