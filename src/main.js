import Snake from './snake';
import Wall from './wall';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width / 20;
export const ch = canvas.height / 20;

let snake = new Snake(50, 50);
let wall = new Wall(cw / 2, ch / 2); //może być problem po zmianie cw
let failed = false;

const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height); //tło
  snake.move();
  snake.tailMove();
  snake.draw();
  wall.draw();
  if (snake.onHit(/*walls*/)) {
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
  snake = new Snake(50, 50);
  wall = new Wall (cw /2, ch /2); //może być problem po zmianie cw
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

requestAnimationFrame(gameLoop);
