class Rex {
  constructor() {
    // Rex attributes
    this.width = area.width * 0.1;
    this.height = area.height * 0.15;
    this.defaultX = area.width/2;
    this.defaultY = area.height - 5 - this.height;
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.step = area.width/100;
    this.direction = "right";

    // image Rex
    this.imageRunLeft = new Image()
    this.imageRunLeft.src = "Images/RexLeft.png";
    this.imageRunRight = new Image()
    this.imageRunRight.src = "Images/RexRight.png";
    this.imageDuckRight = new Image()
    this.imageDuckRight.src = "Images/RexDuckRight.png";
    this.imageDuckLeft = new Image()
    this.imageDuckLeft.src = "Images/RexDuckLeft.png";
    this.image = this.imageRunRight;

    // Audio Rex
    this.jumpAudio = new Audio();
    this.jumpAudio.src = "Audio/Jump.wav";
    this.jumpAudio.volume = 0.1;
  }

  left() {
    this.direction = "left";
    this.image = this.imageRunLeft;
    this.x -= this.step;
  }

  right() {
    this.direction = "right";
    this.image = this.imageRunRight;
    this.x += this.step;
  }

  jump() {
    if(this.defaultY == this.y) {
      this.jumpAudio.currentTime = 0;
      this.jumpAudio.play();

      if(this.direction == "right") { /* Jump right */
        for (var i = 0; i < 30; i++) {
          setTimeout(() => {
            this.y -= 1;
            this.x += 1;
          }, 100);
        }
        setTimeout(() => {
          for (var i = 0; i < 30; i++) {
            setTimeout(() => {
              this.y += 1;
              this.x += 1;
            }, 100);
          }
        }, 200);
      }
      else { /* Jump left */
        for (var i = 0; i < 30; i++) {
          setTimeout(() => {
            this.y -= 1;
            this.x -= 1;
          }, 100);
        }
        setTimeout(() => {
          for (var i = 0; i < 30; i++) {
            setTimeout(() => {
              this.y += 1;
              this.x -= 1;
            }, 100);
          }
        }, 200);
      }
    }
  }

  duck() {
    this.y = this.defaultY + area.height * 0.05;
    if(this.direction == "left") this.image = this.imageDuckLeft;
    else this.image = this.imageDuckRight;
  }

  getUp() {
    this.y = this.defaultY;
    if(this.direction == "left") this.image = this.imageRunLeft;
    else this.image = this.imageRunRight;
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}

class Tree {
  constructor() {
    this.image = new Image();
    this.image.src = "Images/Tree.png";
    this.width = area.width * 0.1;
    this.height = area.height * 0.15;
    this.defaultX = area.width * 1.25;
    this.defaultY = area.height - 5 - this.height;
    this.defaultSpeed = 20;
    this.speed = this.defaultSpeed;
    this.image.onload = () => this.draw();
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if(this.x > 0) this.x -= 2;
    else {
      this.x = area.width + Math.random() * area.width/2;
    }
    if(game.status == 1) setTimeout(() => this.move(), this.speed);
  }

}

class Score {
  constructor() {
    this.score = 0;
    this.defaultSpeed = 1000;
    this.speed = this.defaultSpeed;
  }

  draw() {
    //console.log("draw Score");
    canvasBoard.fillStyle = "black";
    canvasBoard.font = "18px Arial";
    canvasBoard.fillText(`Score: ${this.score}`, area.width - (this.score.toString().length + 6) * 18, 18)
  }

  show() {
    this.score++;

    if(game.status == 1) setTimeout(() => this.show(), this.speed);
  }

}

class Board {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.fullscreen = false;
    this.background = new Image();
    this.background.src = "Images/Background.png";
    this.clearBoard();
    this.createBoard();
  }

  createBoard() {
    canvasBoard.drawImage(this.background, 0, 0, this.width, this.height);
    canvasBoard.strokeStyle = "green";
    canvasBoard.fillStyle = "green";
    canvasBoard.fillRect(0, this.height-5, this.width, 5);
    canvasBoard.beginPath();
    for (var i = 0; i < this.width; i += 15) {
      // drawing grass
      canvasBoard.moveTo(i, this.height - 5);
      canvasBoard.lineTo(i, this.height - 7);
    }
    canvasBoard.stroke();
  }

  clearBoard() {
    //console.log("clearBoard");
    canvasBoard.clearRect(0, 0, this.width, this.height);
  }

  toggleFullscreen() {
    if (this.fullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      this.fullscreen = false;
    }
    else {
      if (document.getElementById("canvas").requestFullscreen)  document.getElementById("canvas").requestFullscreen();
      else if (document.getElementById("canvas").mozRequestFullScreen) document.getElementById("canvas").mozRequestFullScreen();
      else if (document.getElementById("canvas").webkitRequestFullscreen) document.getElementById("canvas").webkitRequestFullscreen();
      else if (document.getElementById("canvas").msRequestFullscreen) document.getElementById("canvas").msRequestFullscreen();
      this.fullscreen = true;
    }
  }

}

class Gold {
  constructor() {
    this.image = new Image();
    this.image.src = "Images/Gold.png";
    this.width = area.width * 0.075;
    this.height = area.height * 0.110;
    this.defaultY = area.height - 20 - Math.floor(Math.random() * rex.height/2);
    this.defaultX = area.width - 2 * this.width;
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.collectAudio = new Audio();
    this.collectAudio.src = "Audio/Gold.wav";
    this.defaultSpeed = 15;
    this.speed = this.defaultSpeed;
    this.defaultPrice = 5;
    this.price = this.defaultPrice;
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collectPlay() {
    this.collectAudio.play();
  }

  move() {
    if(this.y < area.height) this.y++;
    else {
      this.y = 0;
      this.x = Math.random() * area.width;
    }
    if(game.status == 1) setTimeout(() => this.move(), this.speed);
  }

}

class Game {
  constructor() {
    this.status = 0;
    this.collectGold = 0;
    this.start();
  }

  start() { // 0 code
    canvasBoard.fillStyle = "white";
    canvasBoard.fillRect(0, 0, area.width, area.height);
    canvasBoard.fillStyle = "black";
    canvasBoard.font = " 16px Arial";
    canvasBoard.textAlign = "center";
    canvasBoard.fillText(`Press Space or key Up to start game`, area.width / 2, area.height / 2 - 20);
  }

  game() { // 1 code
    // reset variable
    tree.speed = tree.defaultSpeed;
    score.speed = score.defaultSpeed;
    gold.speed = gold.defaultSpeed;
    tree.x = tree.defaultX;
    tree.y = tree.defaultY;
    rex.x = rex.defaultX;
    rex.y = rex.defaultY;
    gold.x = gold.defaultX;
    gold.y = gold.defaultY;
    score.score = 0;
    bird.x = bird.defaultX;
    gold.move();
    tree.move();
    score.show();
    bird.move();
    detectionCollision();
  }

  end() { // 2 code
    //console.error("Game Over");
    this.status = 2;
    this.endBoard();
  }

  endBoard() {
    area.clearBoard();
    canvasBoard.fillStyle = "white";
    canvasBoard.fillRect(0, 0, area.width, area.height);
    canvasBoard.fillStyle = "red";
    canvasBoard.font = "bold 24px Arial";
    canvasBoard.textAlign = "center";
    canvasBoard.fillText(`Game Over!`, area.width / 2, area.height / 2 - 20);
    canvasBoard.font = "24px Arial";
    canvasBoard.fillText(`Your scoure: ${score.score}`, area.width / 2, area.height / 2 + 10);

    canvasBoard.font = "16px Arial";
    canvasBoard.fillStyle = "black";
    canvasBoard.fillText(`Press Space or key Up to start game`, area.width / 2, area.height / 2 + 50);
  }

}

class Bird {
  constructor() {
    this.width = area.width * 0.1;
    this.height = area.height * 0.15;

    this.image = new Image();
    this.image.src = "Images/Bird.png";
    this.defaultX = rex.x;
    this.defaultY = rex.y - this.height;
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.defaultSpeed = 10;
    this.speed = this.defaultSpeed;
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if(this.x > 0) this.x--;
    else {
      this.x = area.width;
      this.y = area.height - Math.random() * area.height / 2;
    }
    if(game.status == 1) setTimeout(() => this.move(), this.speed);
  }

}
