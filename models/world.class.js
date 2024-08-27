class World {
  character = new Charakter();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  coins = [];
  bottles = [];
  throwableObjects = [];
  coinCount = 0;
  bottleCount = 0;
  otherDirection = false;
  endboss = new Endboss();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createCoins();
    this.createBottles();
    this.draw();
    this.setWorld();
    this.runCollisions();
    this.runThrowObjects();
    this.update();
    this.runCollisionsCharacter();
  }

  /**
   * Updates the game state and checks if the status bar for the endboss should be shown.
   * This method periodically checks if the character's x position exceeds 2050, showing the endboss status bar if so.
   * It also triggers the drawing of game objects.
   */
  update() {
    setInterval(() => {
      if (this.character.x >= 2050) {
        this.statusBarEndboss.show();
      }
    }, 100);
    this.draw();
  }

  /**
   * Creates and initializes bottles at random positions and adds them to the `bottles` array.
   * This method creates 10 bottles, each positioned randomly within a specified range, and sets their initial y position.
   */
  createBottles() {
    for (let i = 0; i < 10; i++) {
      let bottle = new Bottles();
      bottle.x = 200 + Math.random() * 2000;
      bottle.y = 350;
      this.bottles.push(bottle);
    }
  }

  /**
   * Increases the bottle count and updates the status bar for bottles.
   * This method increments the bottle count and updates the visual representation of the bottle status bar.
   */
  addBottle() {
    this.bottleCount++;
    this.statusBarBottle.addBottle();
  }

  /**
   * Increases the coin count and updates the status bar for coins.
   * This method increments the coin count and updates the visual representation of the coin status bar.
   */
  addCoin() {
    this.coinCount++;
    this.statusBarCoin.addCoin();
  }

  /**
   * Creates and initializes coins at random positions and adds them to the `coins` array.
   * This method creates 10 coins, each positioned randomly within specified ranges, and adds them to the `coins` array.
   */
  createCoins() {
    for (let i = 0; i < 10; i++) {
      let coin = new Coins();
      coin.x = 200 + Math.random() * 2000;
      coin.y = 0 + Math.random() * 300;
      this.coins.push(coin);
    }
  }

  /**
   * Sets the world reference for the character.
   * This method assigns the current world object to the character's world property.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Periodically checks for collisions in the game.
   * This method sets up an interval to repeatedly check for collisions between game objects.
   */
  runCollisions() {
    setInterval(() => {
      this.checkCollisions();
    }, 10);
  }

  runCollisionsCharacter() {
    setInterval(() => {
      this.chickenCollision();
      this.smallChickenCollision();
      this.coinCollision();
      this.bottleCollision();
      this.EndbossCollision();
    }, 100);
  }

  /**
   * Periodically checks for thrown objects and handles their interactions.
   * This method sets up an interval to repeatedly check if a bottle is thrown and manages the related logic.
   */
  runThrowObjects() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

  /**
   * Checks if a bottle has been thrown and manages the throwing process.
   * This method verifies if the throw key is pressed and if bottles are available, then creates a new throwable object and reduces the bottle count.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.statusBarBottle.setPercentage(this.bottleCount * 10);
    }
  }

  /**
   * Handles collisions between the character and small chickens from above.
   * This method iterates over small chickens and checks if they are colliding with the character while falling. If so, it makes the chicken die and removes it from the level.
   */
  smallChickenCollisionAbove() {
    this.level.smallChicken.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        if (!enemy.isDead) {
          enemy.die();
          this.character.jump();
          this.character.playJumpAnimationOnce();
        }
        setTimeout(() => {
          this.level.smallChicken = this.level.smallChicken.filter((chick) => chick !== enemy);
        }, 1000);
      }
    });
  }

  /**
   * Handles collisions between the character and small chickens.
   * This method iterates over small chickens and checks if they are colliding with the character while not falling. If so, it makes the character take damage.
   */
  smallChickenCollision() {
    this.level.smallChicken.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling() && !enemy.isDead) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles collisions between the character and chickens from above.
   * This method iterates over chickens and checks if they are colliding with the character while falling. If so, it makes the chicken die and removes it from the level.
   */
  chickenCollisionAbove() {
    this.level.chicken.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        if (!enemy.isDead) {
          enemy.die();
          this.character.jump();
          this.character.playJumpAnimationOnce();
        }
        setTimeout(() => {
          this.level.chicken = this.level.chicken.filter((chick) => chick !== enemy);
        }, 1000);
      }
    });
  }

  /**
   * Handles collisions between the character and chickens.
   * This method iterates over chickens and checks if they are colliding with the character while not falling. If so, it makes the character take damage.
   */
  chickenCollision() {
    this.level.chicken.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling() && !enemy.isDead) {
        this.character.hit();
        console.log(this.character.energy);

        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles collisions between the character and the endboss.
   * This method checks if the character collides with the endboss, resulting in the character taking damage and the endboss attacking.
   */
  EndbossCollision() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.endboss.attack();
      this.statusBarHealth.setPercentage(this.character.energy);
    }
  }

  /**
   * Handles collisions between the character and coins.
   * This method iterates over coins and checks if they are colliding with the character. If so, it removes the coin, plays a sound, and updates the coin count.
   */
  coinCollision() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coins.splice(index, 1);
        coin_sound.volume = 0.4;
        coin_sound.play();
        this.addCoin();
      }
    });
  }

  /**
   * Handles collisions between the character and bottles.
   * This method iterates over bottles and checks if they are colliding with the character. If so, it removes the bottle, plays a sound, and updates the bottle count.
   */
  bottleCollision() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1);
        bottle_sound.volume = 0.4;
        bottle_sound.play();
        this.addBottle();
      }
    });
  }

  /**
   * Handles collisions between thrown bottles and the endboss.
   * This method iterates over thrown bottles and checks if they collide with the endboss. If so, it triggers the splash animation and updates the endboss's health.
   */
  bottleCollisionWithEndboss() {
    this.throwableObjects.forEach((thrownBottle) => {
      if (this.endboss.isColliding(thrownBottle)) {
        thrownBottle.splashAnimation();
        this.endboss.hit();
        console.log(this.endboss.energy);

        this.statusBarEndboss.setPercentage(this.endboss.energy);
      }
    });
  }

  /**
   * Checks for various types of collisions in the game.
   * This method invokes collision checks for chickens, coins, bottles, and the endboss, ensuring all game interactions are handled.
   */
  checkCollisions() {
    this.smallChickenCollisionAbove();
    this.chickenCollisionAbove();
    this.bottleCollisionWithEndboss();
  }

  /**
   * Draws all game objects onto the canvas.
   * This method adds background objects, clouds, throwable objects, coins, chickens, small chickens, and bottles to the map for rendering.
   */
  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.bottles);
  }

  /**
   * Clears and redraws the game canvas.
   * This method clears the canvas, applies the camera translation, and draws all game objects, including the character, endboss, and status bars.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjects();
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addStatusBar();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds status bars to the canvas.
   * This method translates the canvas context to account for the camera's position and draws the health, coin, bottle, and endboss status bars.
   */
  addStatusBar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the map for rendering.
   * This method iterates over an array of objects and calls the `addToMap` method to draw each object onto the canvas.
   * @param {Array<Object>} objects - Array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map for rendering.
   * This method draws an object onto the canvas, flipping the image if necessary.
   * @param {Object} mo - The object to be drawn.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally for rendering.
   * This method transforms the canvas context to flip an object's image horizontally.
   * @param {Object} mo - The object whose image will be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the image flipping transformation on the canvas.
   * This method restores the canvas context to its original state after an image has been flipped.
   * @param {Object} mo - The object whose image flipping will be reverted.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
