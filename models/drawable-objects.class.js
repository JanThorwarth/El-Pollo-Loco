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
}
