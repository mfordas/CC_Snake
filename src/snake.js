import { ctx, cw, ch } from './main';

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.direction = null;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, 20, 20);
  }
  setDirection(direction) {
    this.direction = direction;
  }
  move() {
    if (!this.direction) return;

    if (this.direction === 'LEFT') {
      this.x -= this.speed;
    } else if (this.direction === 'RIGHT') {
      this.x += this.speed;
    } else if (this.direction === 'UP') {
      this.y -= this.speed;
    } else if (this.direction === 'DOWN') {
      this.y += this.speed;
    }
  }
  onHit() {
    //check if hit sth
  }
  tailMove() {
    //tail must follow head
  }
}

export default Snake;
