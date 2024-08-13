class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2200;

  constructor(chicken, smallChicken, Endboss, clouds, backgroundObjects) {
    this.chicken = chicken;
    this.smallChicken = smallChicken;
    this.Endboss = Endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
