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
  }

  update() {
    setInterval(() => {
      if (this.character.x >= 2050) {
        this.statusBarEndboss.show();
      }
    }, 100);
    this.draw();
  }

  createBottles() {
    for (let i = 0; i < 10; i++) {
      let bottle = new Bottles();
      bottle.x = 200 + Math.random() * 2000;
      bottle.y = 350;
      this.bottles.push(bottle);
    }
  }

  addBottle() {
    this.bottleCount++;
    this.statusBarBottle.addBottle();
  }

  addCoin() {
    this.coinCount++;
    this.statusBarCoin.addCoin();
  }

  createCoins() {
    for (let i = 0; i < 10; i++) {
      let coin = new Coins();
      coin.x = 200 + Math.random() * 2000;
      coin.y = 0 + Math.random() * 300;
      this.coins.push(coin);
    }
  }

  setWorld() {
    this.character.world = this;
  }
  runCollisions() {
    setInterval(() => {
      this.checkCollisions();
    }, 50);
  }

  runThrowObjects() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
  }

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

  smallChickenCollisionAbove() {
    this.level.smallChicken.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        if (!enemy.isDead) {
          enemy.die();
          this.character.jump();
        }
        setTimeout(() => {
          this.level.smallChicken.splice(index, 1);
        }, 1000);
      }
    });
  }

  smallChickenCollision() {
    this.level.smallChicken.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling() && !enemy.isDead) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  chickenCollisionAbove() {
    this.level.chicken.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        if (!enemy.isDead) {
          enemy.die();
          this.character.jump();
        }
        setTimeout(() => {
          this.level.chicken.splice(index, 1);
        }, 1000);
      }
    });
  }

  chickenCollision() {
    this.level.chicken.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling() && !enemy.isDead) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  EndbossCollision() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.endboss.attack();
      this.statusBarHealth.setPercentage(this.character.energy);
    }
  }

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

  bottleCollisionWithEndboss() {
    this.throwableObjects.forEach((thrownBottle, index) => {
      if (this.endboss.isColliding(thrownBottle)) {
        thrownBottle.splashAnimation();
        this.endboss.hit();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
      }
    });
  }

  checkCollisions() {
    this.chickenCollision();
    this.smallChickenCollision();
    this.smallChickenCollisionAbove();
    this.coinCollision();
    this.bottleCollision();
    this.chickenCollisionAbove();
    this.bottleCollisionWithEndboss();
    this.EndbossCollision();
  }

  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.bottles);
  }

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

  addStatusBar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
