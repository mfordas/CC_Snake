import Snake from './snake';
import Wall from './wall';
import WallCircle from './walls/wallCircle';
import FoodManager from './foodManager';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width - 239;
export const ch = canvas.height;

let failed = false;
let ready2 = false;
let ready3 = false;
let screenReady2 = false;
let screenReady3 = false;
let snake = new Snake(50, 50);

let background = new Image();
background.src = "../src/walls/background.jpg";

export let wallsRectObject = new Wall();
export let wallsCircleObject = new WallCircle();

let wallsRect = wallsRectObject.addWallsRect();
let wallsCircle = wallsCircleObject.addWallsCircle();

let fm = new FoodManager(24, snake, wallsRectObject.wallsRect, wallsCircleObject.wallsCircle);

const gameLoop = () => {
  ctx.drawImage(background,0,0);
  snake.move();
  snake.tailMove();
  wallsCircleObject.drawWalls();
  wallsRectObject.drawWalls();
  fm.manageFood();
  snake.draw();
  if (snake.onHit(wallsRectObject, wallsCircleObject)) {
    gameOver(); 
    return; 
  }

  if (snake.tailLength >= 30 && screenReady2 === false && screenReady3 === false){
    snake.speed = 0;
    screenLevel2();
    if (screenLevel2() === true){
    level2();
    return;}
  }
  
  if (snake.tailLength >= 40 && screenReady2 === true && screenReady3 === false) {
    snake.speed = 0;
    screenLevel3();
    if (screenLevel3() === true){
    level3();
    return;}
  }

  if (snake.tailLength >= 50 && screenReady3 === true) {
    snake.speed = 0;
    screenEndOfGame();
    return;
  }

  navbarDataUpdate();

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

//wyświetla ekran konca gry
const gameOver = () => {
  //Game over
  let fontHeight = 50;
  ctx.font = 50 + "px Arial";
  let textGameOVer = "Game Over";
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, cw/2 - textGameOverSize.width/2 , ch/2);
  //Press Space to restart
  ctx.font = "20px Arial";
  let textPressSpace = "Press Space to restart";
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, cw/2 - textPressSpaceSize.width/2 ,ch/2 + fontHeight/1.5);
  
  failed = true;
}

//restartuje gre
const gameRestart = () => {
  failed = false;
  ready2 = false;
  ready3 = false;
  screenReady2 = false;
  screenReady3 = false;
  //restart obiektów
  ctx.clearRect(0,0, cw, ch);
  snake = new Snake(50, 50);
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsCircleObject.addWallsCircle();
  wallsRectObject.addWallsRect();
  background = new Image();
  background.src = "../src/walls/background.jpg";
  //restart petli gry
  requestAnimationFrame(gameLoop);
}

const screenLevel2 = () => {
  //Game over
  let fontHeight = 50;
  ctx.font = 50 + "px Arial";
  let textGameOVer = "Level 2!";
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, cw/2 - textGameOverSize.width/2 , ch/2);
  //Press Space to restart
  ctx.font = "20px Arial";
  let textPressSpace = "Press Space to start";
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, cw/2 - textPressSpaceSize.width/2 ,ch/2 + fontHeight/1.5);
  
  ready2 = true;
}

const screenLevel3 = () => {
  //Level 3
  let fontHeight = 50;
  ctx.font = 50 + "px Arial";
  let textGameOVer = "Level 3!";
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, cw/2 - textGameOverSize.width/2 , ch/2);
  //Press Space to restart
  ctx.font = "20px Arial";
  let textPressSpace = "Press Space to start";
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, cw/2 - textPressSpaceSize.width/2 ,ch/2 + fontHeight/1.5);
  
  ready3 = true;
}


const screenEndOfGame = () => {
  //Game over
  let fontHeight = 50;
  ctx.font = 50 + "px Arial";
  let textGameOVer = "End of the game! Thanks for playing!";
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, cw/2 - textGameOverSize.width/2 , ch/2);
  //Press Space to restart
  ctx.font = "20px Arial";
  let textPressSpace = "Press Space to play again";
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, cw/2 - textPressSpaceSize.width/2 ,ch/2 + fontHeight/1.5);
  
  failed = true;

}

const level2 = () => {
  snake = new Snake(50, 50);
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  ctx.clearRect(0,0, cw, ch);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsRect = wallsCircleObject.addWallsCircle_level2();
  wallsCircle = wallsRectObject.addWallsRect_level2();
  background = new Image();
  background.src = "../src/walls/background.jpg";
  screenReady2 = true;

  //restart petli gry
  requestAnimationFrame(gameLoop);
}

const level3 = () => {
  ready3 = false;
  ctx.clearRect(0,0, cw, ch);
  snake = new Snake(50, 50);
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsRect = wallsCircleObject.addWallsCircle_level3();
  wallsCircle = wallsRectObject.addWallsRect_level3();
  background = new Image();
  background.src = "../src/walls/background.jpg";
  screenReady3 = true;
  //restart petli gry
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keypress', ({ keyCode }) => {
  console.log(keyCode);

  if (keyCode === 65 || (keyCode == 97 && snake.direction != 'RIGHT')) snake.setDirection('LEFT');
  if (keyCode === 68 || (keyCode == 100 && snake.direction != 'LEFT')) snake.setDirection('RIGHT');
  if (keyCode === 87 || (keyCode == 119 && snake.direction != 'DOWN')) snake.setDirection('UP');
  if (keyCode === 83 || (keyCode == 115 && snake.direction != 'UP')) snake.setDirection('DOWN');
  //Klawisz "K" do wydłużania węża
  if (keyCode === 107) snake.expandSnake();
  // Spacja resetuje gre, jeżeli przegrana
  if (keyCode === 32) {
    if(failed) gameRestart();
    if(ready2) level2();
    if(ready3) level3();
  }
   
});

function navbarDataUpdate() {
  document.getElementById('name').innerHTML =  `name`;
  document.getElementById('score').innerHTML =  `Score: ${snake.tailLength}`;
  document.getElementById('multiplier').innerHTML =  `Multiplier: ${fm.multiplier}`;
}

requestAnimationFrame(gameLoop);
