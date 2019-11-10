import { ctx, cw, ch } from './main';

class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 30;
    this.height = 100;
    this.wallsFirstRow = [];
    this.wallsSecondRow = [];
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.length, this.height);
  }

}

export default Wall;
