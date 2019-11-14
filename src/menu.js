import { ctx, cw, ch, canvas, gameLoop} from './main';

let audio = new Audio();
audio.src = '../src/menu-img/audio.mp3';
let playSound = false;

let rattle = new Audio();
rattle.src = '../src/menu-img/rattlesnake.mp3'

let mouseX;
let mouseY;

let playerName;
let showMenu = true;
let bgImage = new Image();
let logoImage = new Image();
let playImage = new Image();
let settingsImage = new Image();
let creditsImage = new Image();
let playActiveImage = new Image();
let settingsActiveImage = new Image();
let creditsActiveImage = new Image();

bgImage.src = '../src/menu-img/background.jpg';
logoImage.src = '../src/menu-img/logo.png';
playImage.src = '../src/menu-img/play.png';
settingsImage.src = '../src/menu-img/settings.png';
creditsImage.src = '../src/menu-img/credits.png';
playActiveImage.src = '../src/menu-img/play-active.png';
settingsActiveImage.src = '../src/menu-img/settings-active.png';
creditsActiveImage.src = '../src/menu-img/credits-active.png';

let buttonX = [384, 298, 320];
let buttonY = [300, 380, 460];
let buttonWidth = [192, 364, 320];
let buttonHeight = [80, 80, 80];
let buttonActive = [false, false, false];

const mainMenu = () => {
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(bgImage, 0, 0);
  ctx.drawImage(logoImage, 400, 50);
  ctx.drawImage(playImage, buttonX[0], buttonY[0]);
  ctx.drawImage(settingsImage, buttonX[1], buttonY[1]);
  ctx.drawImage(creditsImage, buttonX[2], buttonY[2]);
  if (buttonActive[0]) ctx.drawImage(playActiveImage, buttonX[0], buttonY[0]);
  if (buttonActive[1]) ctx.drawImage(settingsActiveImage, buttonX[1], buttonY[1]);
  if (buttonActive[2]) ctx.drawImage(creditsActiveImage, buttonX[2], buttonY[2]);
  requestAnimationFrame(gameLoop);
};

const checkPosition = mouseEvent => {
  mouseX = mouseEvent.pageX - canvas.getBoundingClientRect().left;
  mouseY = mouseEvent.pageY - canvas.getBoundingClientRect().top;
  //Test pozycji myszy
  //console.log("X: " + mouseX + ", Y: " + mouseY);
  for (let i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] + 20 && mouseY < buttonY[i] + buttonHeight[i] - 10) {
        buttonActive[i] = true;
      } else {
        buttonActive[i] = false;
      }
    } else {
      buttonActive[i] = false;
    }
  }
};

const checkClick = () => {
  for (let i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] + 20 && mouseY < buttonY[i] + buttonHeight[i] - 10) {
        if (buttonActive[0]) {
          console.log('play');
          showMenu = false;
          canvas.removeEventListener('mousemove', checkPosition);
          canvas.removeEventListener('mouseup', checkClick);
        }
        if (buttonActive[1]) {
          console.log('settings');
          toggleModalSettings();
        }
        if (buttonActive[2]) {
          console.log('credits');
          toggleModalCredits();
        }
      }
    }
  }
};

const playMusic = () => {
  playSound = !playSound;
  if (!playSound) audio.pause();
  if (playSound) audio.play();
};

//okna modalne
let modalSettings = document.querySelector('.modalSettings');
let closeButtonSettings = document.querySelector('.close-button-settings');
let modalCredits = document.querySelector('.modalCredits');
let closeButtonCredits = document.querySelector('.close-button-credits');

const toggleModalSettings = () => {
  modalSettings.classList.toggle('show-modal');
  playerName = document.getElementById('playerName').value;
};

const toggleModalCredits = () => {
  modalCredits.classList.toggle('show-modal');
};

const windowOnClick = event => {
  if (event.target === modalSettings) {
    toggleModalSettings();
  }
  if (event.target === modalCredits) {
    toggleModalCredits();
  }
};

closeButtonSettings.addEventListener('click', toggleModalSettings);
closeButtonCredits.addEventListener('click', toggleModalCredits);
window.addEventListener('click', windowOnClick);

export { mainMenu, checkPosition, checkClick, playMusic, showMenu, playSound, playerName, rattle };
