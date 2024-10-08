export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 18;
    this.fontFamily = "fantasy";
  }

  update() {}

  draw(context) {
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText(`Score: ${(this.game.time * 0.001).toFixed(1)}`, 20, 35);

    // if game over
    if (this.game.gameOver) {
      context.drawImage(
        document.getElementById("gameover"),
        this.game.width * 0.25,
        this.game.height * 0.1,
        this.game.width * 0.5,
        this.game.height * 0.5
      );
      context.fillText(
        "Press ENTER to start again",
        this.game.width * 0.36,
        this.game.height * 0.6
      );
    }
  }
}
