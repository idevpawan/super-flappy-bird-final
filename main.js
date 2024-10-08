import { Background } from "./background.js";
import { Enemy } from "./enemy.js";
import { Fireball } from "./fireball.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
  // get the canvas
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 850;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.background = null;
      this.player = null;
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.fireballs = [];
      this.speed = 1;
      this.gameOver = false;
      this.ui = new UI(this);
      this.time = 0;
      this.debug = false;
      this.initGame();
    }

    initGame() {
      this.background = new Background(
        this,
        document.getElementById("background")
      );
      this.player = new Player(this, document.getElementById("player"));
      this.enemies = [];
      this.fireballs = [];
      this.enemyTimer = 0;
      this.gameOver = false;
      this.time = 0;
    }

    update(delta) {
      console.log(this.score);
      console.log(this.fireballs);
      // player
      this.player.update();
      // background
      this.background.update();
      // enemies
      this.enemies.map((enemy) => {
        enemy.update(delta);
      });
      // fireballs
      this.fireballs.map((fireball) => {
        fireball.update(delta);
      });

      this.enemyTimer += delta;
      this.time += delta;

      // spawn enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy(delta);
        this.enemyTimer = 0;
      }

      this.ui.update(delta);

      this.updateEnemyArray();
      this.updateFireballArray();

      // update game difficulty level
      if (this.time * 0.001 > 40) {
        this.speed = 2;
      }

      if (this.time * 0.001 > 80) {
        this.speed = 3;
      }
    }

    updateEnemyArray() {
      this.enemies.forEach((entity, index) => {
        if (entity.markForDelete) {
          this.enemies.splice(index, 1);
        }
      });
    }

    updateFireballArray() {
      this.fireballs.forEach((entity, index) => {
        if (entity.markForDelete) {
          this.fireballs.splice(index, 1);
        }
      });
    }

    addEnemy() {
      this.enemies.push(new Enemy(this));
    }
    addFireball() {
      this.fireballs.push(new Fireball(this));
    }

    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width - 20 &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }

    draw(context) {
      // background
      this.background.draw(context);
      //   player
      this.player.draw(context);
      // enemies
      this.enemies.map((enemy) => {
        enemy.draw(context);
      });
      // fireball
      this.fireballs.map((fireball) => {
        fireball.draw(context);
      });
      // UI
      this.ui.draw(context);
    }

    restart() {
      this.initGame();
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const delta = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.update(delta);
    game.draw(context);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);

  // Add event listener for ENTER key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && game.gameOver) {
      game.restart();
      animate(0);
    }
  });
});
