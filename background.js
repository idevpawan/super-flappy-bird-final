export class Background {
  constructor(game, image) {
    this.game = game;
    this.image = image;
    this.width = this.game.width;
    this.height = this.game.height;
    this.x = 0;
    this.y = 0;
  }

  update() {
    // Move the background to the left
    this.x -= this.game.speed;

    // Reset position when the image scrolls out of view to create a seamless loop
    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  draw(context) {
    // Draw the first image
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    // Draw a second image next to the first for a seamless loop
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
