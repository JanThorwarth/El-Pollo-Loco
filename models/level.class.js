class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2200;

  constructor(chicken, smallChicken, endboss, clouds, backgroundObjects) {
    this.chicken = chicken;
    this.smallChicken = smallChicken;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
