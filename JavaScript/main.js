canvas = document.getElementById('canvas');
canvasBoard = canvas.getContext('2d');
var interval;

area = new Board();
rex = new Rex();
tree = new Tree();
gold = new Gold();
score = new Score();
game = new Game();

function refreshArea() {
  if(game.status == 1) {
    area.clearBoard();
    area.createBoard();
    tree.draw();
    rex.draw();
    score.draw();
    gold.draw();
  }
  window.requestAnimationFrame(refreshArea);
}

function keyEvent(key) {
  switch (game.status) {
    case 0:
      if(key.keyCode == 32 || key.keyCode == 38) {
        game.status = 1;
        game.game();
      }
      break;
    case 1:
      switch (key.keyCode) {
        case 37:
          rex.left();
          break;
        case 39:
          rex.right();
          break;
        case 38:
        case 32:
          rex.jump();
          break;
        case 40:
          rex.down();
          break;
      }
      break;
    case 2:
      if(key.keyCode == 32 || key.keyCode == 38) {
        game.status = 1;
        game.game();
      }
      break;
  }
}

function detectionCollision() {
  if (((tree.x - rex.x < tree.width) && (rex.x < tree.x)) && (area.height - 5 - tree.height <= rex.y))  {
    game.status = 2;
    game.end();
  }

  if ((rex.x == gold.x)) {
    score.score += gold.price;
    gold.speed /= 2;
    gold.collectPlay();
  }

  if(game.status == 1) setTimeout(detectionCollision, 20);
}

// setInterval(detectionCollision, 20);
window.requestAnimationFrame(refreshArea);
document.addEventListener("keydown", keyEvent);
