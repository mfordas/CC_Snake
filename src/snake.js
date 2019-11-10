import { ctx, cw, ch, canvas } from './main';
import { runInThisContext } from 'vm';
import Wall from './wall';

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.cell = 20;
    this.direction = null;
    this.tailLength = 0;
    this.tail = [];
  }

  draw() {
    //ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.cell, this.cell);
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillStyle = (i== this.tail.length - 1)? 'green' : "red";
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.cell, this.cell);

      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.tail[i].x, this.tail[i].y, this.cell, this.cell);
    }
  }
  setDirection(direction) {
    this.direction = direction;
  }

  // funkcja wydłużająca węża w związku z brakiem jedzenia
  expandSnake() {
    this.tailLength++;
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
  
  onHit(walls) {
    
    
    let w = walls.wallsFirstRow.concat(walls.wallsSecondRow);

    //tmp code
    //let wa = new Wall();
    //wa.wallsFirstRow.push(new Wall(canvas.width/40,canvas.height/40));
    //let w = [];
    //w.push(wa.wallsFirstRow[0]);

    //check if hit sth
    if (this.x < 0 || this.y < 0 || this.x + this.cell > canvas.width || this.y + this.cell > canvas.height)
    {
      return true;
    }
    //minimalna liczba czesci weza przy ktorej moze sie ugryzc
    let minPartsNumber = Math.ceil((3*this.cell)/this.speed);
    for (let i=0; i<this.tailLength - minPartsNumber; i++) {
      //lewy gorny rogW
      if (this.x > this.tail[i].x && 
        this.x < this.tail[i].x + this.cell && 
        this.y > this.tail[i].y && 
        this.y < this.tail[i].y + this.cell) {
          return true;
      }
      //prawy gorny rog
      else if (this.x + this.cell > this.tail[i].x &&
        this.x + this.cell < this.tail[i].x + this.cell && 
        this.y > this.tail[i].y && 
        this.y < this.tail[i].y + this.cell) {
          return true;
      }
      //lewy dolny rog
      else if (this.x > this.tail[i].x && 
        this.x < this.tail[i].x + this.cell && 
        this.y + this.cell > this.tail[i].y && 
        this.y + this.cell < this.tail[i].y + this.cell) {
          return true;
      }
      //prawy dolny rog
      else if (this.x + this.cell > this.tail[i].x && 
        this.x + this.cell < this.tail[i].x + this.cell && 
        this.y + this.cell > this.tail[i].y && 
        this.y +this.cell < this.tail[i].y + this.cell) {
          return true;
      }      
    } 

    // //sciany
    for (let i=0; i<w.length; i++) {
      //lewy gorny rogW
      if (this.x > w[i].x &&
        this.x < w[i].x + w[i].length && 
        this.y > w[i].y && 
        this.y < w[i].y + w[i].height) {
          return true;
      }
      //prawy gorny rog
      else if (this.x + this.cell > w[i].x &&
        this.x + this.cell < w[i].x + w[i].length && 
        this.y > w[i].y && 
        this.y < w[i].y + w[i].height) {
          return true;
      }
      //lewy dolny rog
      else if (this.x > w[i].x && 
        this.x < w[i].x + w[i].length && 
        this.y + this.cell > w[i].y && 
        this.y + this.cell < w[i].y + w[i].height) {
          return true;
      }
      //prawy dolny rog
      else if (this.x + this.cell > w[i].x && 
        this.x + this.cell < w[i].x + w[i].length && 
        this.y + this.cell > w[i].y &&
        this.y +this.cell < w[i].y + w[i].height) {
          return true;
      }      
    } 
    
    return false;
  }

  tailMove() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.tailLength] = { x: this.x, y: this.y};
  }


}

export default Snake;
