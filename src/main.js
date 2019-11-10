import Snake from './snake';
import Wall from './wall';
import FoodManager from './foodManager';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

let failed = false;
export let snake = new Snake(50, 50);
export const fm = new FoodManager(24);


let background = new Image();
background.src = "../src/walls/background.jpg";

let walls = new Wall();
const itemsFirstRow = walls.addItemsToFirstRow();
const itemsSecondRow = walls.addItemsToSecondRow();

const gameLoop = () => {
  ctx.drawImage(background,0,0);
  snake.move();
  snake.tailMove();
  walls.drawWalls(itemsFirstRow, itemsSecondRow);
  fm.manageFood();
  snake.draw();
  if (snake.onHit(walls)) {
    gameOver(); 
    return; 
  };

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

//wyświetla ekran konca gry
const gameOver = () => {
  //Game over
  let fontHeight = 50;
  ctx.font = 50 + "px Arial";
  let textGameOVer = "Game Over";
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, canvas.width/2 - textGameOverSize.width/2 , canvas.height/2);
  //Press Space to restart
  ctx.font = "20px Arial";
  let textPressSpace = "Press Space to restart";
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, canvas.width/2 - textPressSpaceSize.width/2 , canvas.height/2 + fontHeight/1.5);
  
  failed = true;
}

//restartuje gre
const gameRestart = () => {
  failed = false;
  //restart obiektów
  ctx.clearRect(0,0, cw, ch);
  snake = new Snake(50, 50);
  walls = new Wall ();
  walls.addItemsToFirstRow();
  walls.addItemsToSecondRow();
  background = new Image();
  background.src = "../src/walls/background.jpg";
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
  }  
});

console.log(itemsFirstRow[0]);
console.log(itemsFirstRow[1]);

console.log(itemsFirstRow[2]);

console.log(itemsFirstRow[3]);


requestAnimationFrame(gameLoop);
