import { Fireball } from "./fireball.js";

export class Player {
  constructor(game, image) {
    this.game = game;
    this.image = image;
    this.width = 80;
    this.height = 65;
    this.x = 100;
    this.y = 0;
    this.gravity = 0.1;
    this.jumpForce = -5; // Set initial jump force
    this.velocityY = 0;
    this.isJumping = false; // Track if currently jumping

    // Add input event listeners once
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    if (e.key === " " && !this.isJumping) {
      this.isJumping = true;
      this.velocityY = this.jumpForce; // Apply jump force
    }

    if (e.key === "f") {
      this.game.fireballs.push(new Fireball(this.game));
    }
  }

  handleKeyUp(e) {
    if (e.key === " " && this.isJumping) {
      this.isJumping = false;
    }
  }

  update() {
    // Apply gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    // Check collision with the ground
    if (this.y + this.height >= this.game.height) {
      this.y = this.game.height - this.height;
      this.velocityY = 0;
      this.game.gameOver = true;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
