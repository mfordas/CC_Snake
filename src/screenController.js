import { ctx, cw, ch } from './main';
import * as menu from './menu';

export let ready2 = false;
export let ready3 = false;

export const readyReset = () => {
  ready2 = false;
  ready3 = false;
}

export const screenLevel2 = () => {
    //Game over
    let fontHeight = 50;
    ctx.font = 50 + 'px Visitor';
    let textGameOVer = 'Level 2!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to restart
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to start';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
    console.log('pierwsze '+ready2);
    ready2 = true;
    console.log('drugie '+ready2);
  };
  
  export const screenLevel3 = () => {
    ready2 = false;
    //Level 3
    let fontHeight = 50;
    ctx.font = 50 + 'px Visitor';
    let textGameOVer = 'Level 3!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to restart
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to start';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
    ready3 = true;
  };
  
  export const screenEndOfGame = () => {
    //Game over
    let fontHeight = 50;
    ctx.font = 45 + 'px Visitor';
    let textGameOVer = 'End of the game! Thanks for playing!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to restart
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to play again';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
    menu.showMenuTrue();
  };