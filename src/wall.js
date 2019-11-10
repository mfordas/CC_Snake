import { ctx, cw, ch, walls } from './main';

class Wall {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 100;
    this.height = 40;
    this.radius = this.height/2;
    this.time = null;
    this.upperRow = ch/3;
    this.upperRowCircle = this.upperRow+this.radius;
    this.bottomRow = 2*ch/3;
    this.bottomRowCircle = this.bottomRow+this.radius;
    this.wallsRect = [];
    this.type = 'rect';
  }

  // rysowanie prostokątów
  drawRect() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.length, this.height);
  }

  // dodawanie prostokątnych ścian do tablicy
  addWallsRect() {
    this.wallsRect.push(new Wall(5*cw/12, this.upperRow));
    this.wallsRect.push(new Wall((9.5*cw / 12)+3*this.radius, this.upperRow));
    this.wallsRect.push(new Wall(2.5*cw/12, this.bottomRow));
    this.wallsRect.push(new Wall((2.5*cw/12)+this.length+6*this.radius, this.bottomRow));

    return this.wallsRect;
  }

  // rysowanie ścian
  drawWalls(arr1){
  let i=0;
  
  for (i; i<arr1.length; i++){
    if (arr1[i].type === 'rect'){
        ctx.beginPath();
        arr1[i].drawRect();
        ctx.closePath();
    } 
    else {
        ctx.beginPath();
        arr1[i].drawRect();
        ctx.closePath();
    }
  }
  }

  // rysowanie tekstu
  drawText() {
    ctx.font = '300px bold serif';
    ctx.fillText('S', cw /12, ch/2.5);
    ctx.fillText('N', 5*cw /12, ch/2.5);
    ctx.fillText('A', 9*cw /12, ch/2.5);
    ctx.fillText('K', 3*cw /12, 2.2*ch/2.5);
    ctx.fillText('E', 7*cw /12, 2.2*ch/2.5);
  }

  // zmiana ścian na tekst
  async wallsChange() {
    console.log('dziala');
    await sleep(10000);
    console.log('po 10s');
}

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Wall;
