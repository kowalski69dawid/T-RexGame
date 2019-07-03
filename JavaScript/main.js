canvas = document.getElementById('canvas');
canvasBoard = canvas.getContext('2d');
var interval;

area = new Board();
rex = new Rex();
tree = new Tree();
gold = new Gold();
score = new Score();
bird = new Bird();
game = new Game();


function refreshArea() {
  if(game.status == 1) {
    area.clearBoard();
    area.createBoard();
    tree.draw();
    rex.draw();
    score.draw();
    gold.draw();
    bird.draw();
  }
  window.requestAnimationFrame(refreshArea);
}

function keyEvent(key) {
  if(key.keyCode == 70) area.toggleFullscreen();
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

  // detect tree
  if (((tree.x - rex.x < tree.width) && (rex.x < tree.x)) && (area.height - 5 - tree.height <= rex.y))  {
    game.status = 2;
    game.end();
  }

  // detect gold
  if ((gold.x - rex.x < area.width/100) && (gold.y - rex.y < rex.height)) {
    score.score += gold.price;
    if((score.score % 30 == 0) && (gold.speed > 10)) gold.speed -= 2;
    gold.price++;
    tree.speed -= 2;
    gold.collectPlay();
    gold.y = area.height - 20 - Math.floor(Math.random() * area.height / 3);
    gold.x = area.width + Math.floor(Math.random() *500 + 1);
  }

  // detect bird
  if ((bird.x - rex.x < area.width/100) && (bird.y - rex.y < rex.height - bird.height)) {
    game.status = 2;
    game.end();
  }

  if(game.status == 1) setTimeout(detectionCollision, 20);
}

window.requestAnimationFrame(refreshArea);
window.addEventListener("blur", () => {
  console.log("blur");
  if(area.fullscreen) area.fullscreen = false;
});
document.addEventListener("keydown", keyEvent);
document.getElementById("Fullscreen").addEventListener("click", () => area.toggleFullscreen());
