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
  coins = [];
  bottles = [];
  throwableObjects = [];
  coinCount = 0;
  bottleCount = 0;
  otherDirection = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createCoins();
    this.createBottles();
    this.draw();
    this.setWorld();
    this.run();
  }

  createBottles() {
    for (let i = 0; i < 5; i++) {
      // Erzeuge mehrere Flaschen
      let bottle = new Bottles();
      bottle.x = 200 + Math.random() * 2000; // Zufällige Position im Bereich
      bottle.y = 350;
      this.bottles.push(bottle);
    }
  }

  addBottle() {
    this.bottleCount++;
    this.statusBarBottle.addBottle(); // Aktualisiere die Statusleiste für Flaschen
  }

  addCoin() {
    this.coinCount++;
    this.statusBarCoin.addCoin(); // Aktualisiere die Statusleiste
  }

  createCoins() {
    for (let i = 0; i < 5; i++) {
      // Erzeuge 5 Münzen
      let coin = new Coins();
      coin.x = 200 + Math.random() * 2000; // Zufällige Position im Bereich
      coin.y = 0 + Math.random() * 300;
      this.coins.push(coin);
    }
  }

  setWorld() {
    this.character.world = this;
  }
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
      // Nur werfen, wenn Flaschen vorhanden sind
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle); // Flasche zur Wurfobjekt-Liste hinzufügen
      this.bottleCount--; // Flaschenanzahl verringern
      this.statusBarBottle.setPercentage(this.bottleCount * 20); // Statusleiste aktualisieren
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
        }, 2000);
      }
    });
  }

  smallChickenCollision() {
    this.level.smallChicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  ChickenCollisionAbove() {
    this.level.chicken.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        if (!enemy.isDead) {
          enemy.die();
          this.character.jump();
        }
        setTimeout(() => {
          this.level.chicken.splice(index, 1);
        }, 2000);
      }
    });
  }

  chickenCollision() {
    this.level.chicken.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  coinCollision() {
    this.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coins.splice(index, 1); // Münze entfernen
        this.addCoin(); // Münzenzahl erhöhen und Statusleiste aktualisieren
      }
    });
  }

  bottleCollision() {
    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottles.splice(index, 1); // Flasche entfernen
        this.addBottle(); // Flaschenzahl erhöhen und Statusleiste aktualisieren
      }
    });
  }

  checkCollisions() {
    this.chickenCollision();
    this.smallChickenCollision();
    this.smallChickenCollisionAbove();
    this.coinCollision();
    this.bottleCollision();
    this.ChickenCollisionAbove();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.chicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.Endboss);

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
    mo.drawFrame(this.ctx);

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
