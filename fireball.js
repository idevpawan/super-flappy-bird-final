export class Fireball {
  constructor(game) {
    this.game = game;
    this.width = 25;
    this.height = 25;
    this.image = document.getElementById("fireball");
    this.x = 180;
    this.y = game.player.y + 37;
    this.markForDelete = false;
  }

  update() {
    if (this.game.gameOver) return;
    this.x += 2 * this.game.speed;
    if (this.x > this.game.width - 15) {
      this.markForDelete = true;
    }
    this.checkCollisions();
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      this.game.fireballs.forEach((fireball) => {
        if (this.game.checkCollision(enemy, fireball)) {
          this.handleEnemyDestruction(enemy, fireball);
          return;
        }
      });
    });
  }

  handleEnemyDestruction(enemy, fireball) {
    enemy.markForDelete = true;
    fireball.markForDelete = true;
  }
}
