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

let wallsRectObject = new Wall();
let wallsCircleObject = new WallCircle();

let wallsRect = wallsRectObject.addWallsRect();
let wallsCircle = wallsCircleObject.addWallsCircle();

let fm = new FoodManager(24, snake, wallsRectObject.wallsRect, wallsCircleObject.wallsCircle);

//menu glowne
let audio = new Audio();
audio.src = "../src/menu-img/audio.mp3";
let playSound = false;
let mouseX;
let mouseY;
let showMenu = true;
let bgImage = new Image();
let logoImage = new Image();
let playImage = new Image();
let playActiveImage = new Image();
let settingsImage = new Image();
let settingsActiveImage = new Image();
let creditsImage = new Image();
let creditsActiveImage = new Image();

bgImage.src = "../src/menu-img/background.jpg";
logoImage.src = "../src/menu-img/logo.png";
playImage.src = "../src/menu-img/play.png";
playActiveImage.src = "../src/menu-img/play-active.png";
settingsImage.src = "../src/menu-img/settings.png";
settingsActiveImage.src = "../src/menu-img/settings-active.png";
creditsImage.src = "../src/menu-img/credits.png";
creditsActiveImage.src = "../src/menu-img/credits-active.png";

let buttonX = [384, 298, 320];
let buttonY = [300, 380, 460];
let buttonWidth = [192, 364, 320];
let buttonHeight = [80, 80, 80];
let buttonActive = [false, false, false] 

const gameLoop = () => {
  if(showMenu === true){
    mainMenu();
    return;
  }
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
    screenLevel2();
    return;
  }
  
  if (snake.tailLength >= 40 && screenReady2 === true && screenReady3 === false) {
    screenLevel3();
    return;
  }

  if (snake.tailLength >= 50 && screenReady3 === true) {
    screenEndOfGame();
    return;
  }

  navbarDataUpdate();

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};


const mainMenu = () => {
  ctx.clearRect(0,0, cw, ch);
  ctx.drawImage(bgImage, 0, 0);
  ctx.drawImage(logoImage, 400, 50);
  ctx.drawImage(playImage, buttonX[0], buttonY[0]);
  ctx.drawImage(settingsImage, buttonX[1], buttonY[1])
  ctx.drawImage(creditsImage, buttonX[2], buttonY[2]);
  if(buttonActive[0]) ctx.drawImage(playActiveImage, buttonX[0], buttonY[0]);
  if(buttonActive[1]) ctx.drawImage(settingsActiveImage, buttonX[1], buttonY[1])
  if(buttonActive[2]) ctx.drawImage(creditsActiveImage, buttonX[2], buttonY[2]);
  requestAnimationFrame(gameLoop);
}

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
  ready2 = false;
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
  showMenu = true;
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



const checkPosition = (mouseEvent) => {
  mouseX = mouseEvent.pageX  - canvas.getBoundingClientRect().left; 
  mouseY = mouseEvent.pageY - canvas.getBoundingClientRect().top;
  //Test pozycji myszy
  //console.log("X: " + mouseX + ", Y: " + mouseY);
  for(let i = 0; i < buttonX.length; i++ ){
    if(mouseX > buttonX[i] && (mouseX < buttonX[i] + buttonWidth[i])){
      if((mouseY > buttonY[i]+20) && (mouseY < buttonY[i] + buttonHeight[i] - 10)){
        buttonActive[i] = true;
      }else{
        buttonActive[i] = false;
      }
    }else{
      buttonActive[i] = false;
    }
  }
}
canvas.addEventListener('mousemove', checkPosition);

const checkClick = (mouseEvent) => {
  for(let i = 0; i < buttonX.length; i++ ){
    if(mouseX > buttonX[i] && (mouseX < buttonX[i] + buttonWidth[i])){
      if((mouseY > buttonY[i]+20) && (mouseY < buttonY[i] + buttonHeight[i] - 10)){
        if(buttonActive[0]){
          showMenu = false;
          gameRestart();
        }
        if(buttonActive[1])console.log("settings")
        if(buttonActive[2])console.log("credits")
      }
    }
  }
}
canvas.addEventListener('mouseup', checkClick);

const playMusic = () => {
  if(!playSound)audio.pause();
  if(playSound)audio.play();
}

document.addEventListener('keypress', ({ keyCode }) => {
  console.log(keyCode);

  if ((keyCode === 65 || keyCode == 97) && snake.direction != 'RIGHT') snake.setDirection('LEFT');
  if ((keyCode === 68 || keyCode == 100) && snake.direction != 'LEFT') snake.setDirection('RIGHT');
  if ((keyCode === 87 || keyCode == 119) && snake.direction != 'DOWN') snake.setDirection('UP');
  if ((keyCode === 83 || keyCode == 115) && snake.direction != 'UP') snake.setDirection('DOWN');
  //Klawisz "K" do wydłużania węża
  if (keyCode === 107) snake.expandSnake();
  if (keyCode === 109 || keyCode === 77) {
    playSound = !playSound;
    playMusic()
  }
  //klawisz "R" do wyłączania menu głównego
  if (keyCode === 82){
    showMenu = false;
    gameRestart();}
  // Spacja resetuje gre, jeżeli przegrana
  if (keyCode === 32) {
    if(failed) gameRestart();
    if(ready2) level2();
    if(ready3) level3();
  }
   
});

function navbarDataUpdate() {
  document.getElementById('name').innerHTML =  `name`;
  document.getElementById('score-span').innerHTML =  `${snake.tailLength}`;
  document.getElementById('multiplier-span').innerHTML =  `${fm.multiplier}`;
}

requestAnimationFrame(gameLoop);
