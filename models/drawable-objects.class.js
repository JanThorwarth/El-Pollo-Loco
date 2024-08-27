class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 160;
  height = 270;
  width = 150;
  visible = true;

  /**
   * Loads an image from the specified path and sets it as the object's current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's current image onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Loads multiple images from an array of paths and caches them.
   * Each image is stored in the `ImageCache` with its path as the key.
   *
   * @param {string[]} arr - An array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
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
}
