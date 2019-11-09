import { ctx, cw, ch } from './main';

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
    this.wallsFirstRow = [];
    this.wallsSecondRow = [];
  }
  drawRect() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.length, this.height);
  }

  drawCirc(){
    ctx.fillStyle = 'black';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  }

  addItemsToFirstRow() {
    this.wallsFirstRow.push(new Wall(cw/12, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall((cw / 12)+4*this.radius, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall((cw/12)+8*this.radius, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall((cw/12)+8*this.radius, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall(5*cw/12, this.upperRow));
    this.wallsFirstRow.push(new Wall((5*cw/12)+this.length+3*this.radius, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall(9.5*cw / 12, this.upperRowCircle));
    this.wallsFirstRow.push(new Wall((9.5*cw / 12)+3*this.radius, this.upperRow));

    return this.wallsFirstRow;
  }

  addItemsToSecondRow() {
    this.wallsSecondRow.push(new Wall(2.5*cw/12, this.bottomRow));
    this.wallsSecondRow.push(new Wall((2.5*cw/12)+this.length+3*this.radius, this.bottomRowCircle));
    this.wallsSecondRow.push(new Wall((2.5*cw/12)+this.length+6*this.radius, this.bottomRow));
    this.wallsSecondRow.push(new Wall(8.5*cw/12, this.bottomRowCircle));

    return this.wallsSecondRow;
    }

    returnObjectFromArray (i) {
      return this.wallsFirstRow[i];
    }

  drawWalls(arr1, arr2){
    //upper row
  ctx.beginPath();
  let i=0;
  for (i; i<=3; i++){
    arr1[i].drawCirc();
  };
  if (i = 4){
    arr1[i].drawRect();
  }
  for (i =5; i<=6; i++){
    arr1[i].drawCirc();
  }
  if(i=7){
    arr1[i].drawRect();
  }
  ctx.closePath();

  //bottom row
  ctx.beginPath();
  i=0;
  for (i; i<1; i++){
    arr2[i].drawRect();
  };
  if (i = 1){
    arr2[i].drawCirc();
    i++
  }
  if (i =2){
    arr2[i].drawRect();
    i++
  }
  if(i=3){
    arr2[i].drawCirc();
  }
  ctx.closePath();
  }

  drawText() {
    ctx.font = '300px bold serif';
    ctx.fillText('S', cw /12, ch/2.5);
    ctx.fillText('N', 5*cw /12, ch/2.5);
    ctx.fillText('A', 9*cw /12, ch/2.5);
    ctx.fillText('K', 3*cw /12, 2.2*ch/2.5);
    ctx.fillText('E', 7*cw /12, 2.2*ch/2.5);
  }

  

}

export default Wall;
