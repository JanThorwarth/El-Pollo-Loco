class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  percentage = 500;
  visible = false;
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 480;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(500);
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
   * Resolves the image index based on the current percentage value.
   *
   * This method determines the index of the image to be used based on the `percentage` property. The index is
   * chosen based on predefined ranges of percentage values:
   * @returns {number} The index of the image to use based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage <= 100) {
      return 1;
    } else if (this.percentage <= 200) {
      return 2;
    } else if (this.percentage <= 300) {
      return 3;
    } else if (this.percentage <= 400) {
      return 4;
    } else {
      return 5;
    }
  }
}
