import Snake from './snake';
import Wall from './wall';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const snake = new Snake(50, 50);


const background = new Image();
background.src = "../src/walls/background.jpg";

const walls = new Wall();
const itemsFirstRow = walls.addItemsToFirstRow();
const itemsSecondRow = walls.addItemsToSecondRow();

const gameLoop = () => {
  ctx.drawImage(background,0,0);
  //ctx.fillStyle = 'white';
  //ctx.fillRect(0, 0, cw, ch); //tło
  snake.move();
  snake.tailMove();
  snake.onHit();
  snake.draw();
  walls.drawWalls(itemsFirstRow, itemsSecondRow);
  

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

document.addEventListener('keypress', ({ keyCode }) => {
  console.log(keyCode);

  if (keyCode === 65 || (keyCode == 97 && snake.direction != 'RIGHT')) snake.setDirection('LEFT');
  if (keyCode === 68 || (keyCode == 100 && snake.direction != 'LEFT')) snake.setDirection('RIGHT');
  if (keyCode === 87 || (keyCode == 119 && snake.direction != 'DOWN')) snake.setDirection('UP');
  if (keyCode === 83 || (keyCode == 115 && snake.direction != 'UP')) snake.setDirection('DOWN');
  //Klawisz "K" do wydłużania węża
  if (keyCode === 107) snake.expandSnake();
});

console.log(itemsFirstRow[0]);

requestAnimationFrame(gameLoop);
