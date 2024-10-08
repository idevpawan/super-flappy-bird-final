export class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 80;
    this.height = 70;
    this.image = document.getElementById("enemy");
    this.y = Math.random() * this.game.height;
    this.x = this.game.width;
    this.markForDelete = false;
  }

  update() {
    if (this.x + this.width < 0) this.markForDelete = true;
    this.x -= 1 * this.game.speed;

    if (this.game.checkCollision(this.game.player, this))
      this.game.gameOver = true;
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
