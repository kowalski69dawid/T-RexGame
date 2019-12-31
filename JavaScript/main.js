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
  if(key.keyCode == 70) area.toggleFullscreen();
  switch (game.status) {
    case 0:
      if(key.keyCode == 32 || key.keyCode == 38) {
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
          rex.duck();
      }
      break;
    case 2:
      if(key.keyCode == 32 || key.keyCode == 38) {
        game.game();
      }
      break;
  }
}

function detectionCollision() {
  //detect tree
  if ((tree.x < rex.x + rex.width) &&
   (tree.x + tree.width > rex.x) &&
   (tree.y < rex.y + rex.height) &&
   (tree.y + tree.height > rex.y))  {
    game.end();
  }

  // detect gold
  if ((gold.x < rex.x + rex.width) &&
   (gold.x + gold.width > rex.x) &&
   (gold.y < rex.y + rex.height) &&
   (gold.y + gold.height > rex.y))  {
    score.score += gold.price;
    if((game.collectGold % 10 == 0) && (gold.speed > 10)) gold.speed -= 2;
    gold.price++;
    if((game.collectGold %5 == 0) && (tree.speed > 6)) tree.speed--;
    gold.collectPlay();
    gold.y = area.height - 20 - Math.floor(Math.random() * area.height / 3);
    gold.x = area.width + Math.floor(Math.random() *500 + 1);
  }

  // detect walls
  if(rex.x <= 0) rex.x = 0;
  else if(rex.x + rex.width >= area.width) rex.x = area.width - rex.width;
  else if(rex.y >= area.height) rex.y = rex.defaultY;

  if(game.status == 1) setTimeout(detectionCollision, 20);
}

window.requestAnimationFrame(refreshArea);
window.addEventListener("blur", () => {
  if(area.fullscreen) area.fullscreen = false;
});
document.addEventListener("keydown", keyEvent);
document.addEventListener("keyup", (key) => {
  if(key.keyCode == 40) rex.getUp();
});
document.getElementById("Fullscreen").addEventListener("click", () => area.toggleFullscreen());
