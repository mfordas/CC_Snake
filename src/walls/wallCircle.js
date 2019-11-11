import Wall from '../wall';
import { ctx, cw, ch, walls } from '../main';

//klasa do ścian okrągłych
class WallCircle extends Wall {

    constructor(x, y) {
        super (x, y);
        this.length = this.length;
        this.height = this.height;
        this.radius = this.height/2;
        this.time = null;
        this.upperRow = this.upperRow;
        this.bottomRow = this.bottomRow;
        this.radius = this.height/2;
        this.upperRowCircle = this.upperRow+this.radius;
        this.bottomRowCircle = this.bottomRow+this.radius;
        this.wallsCircle = [];
        this.type = 'circl';
      }
      // rysowanie ścian okrągłych
      drawCirc(){
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
      }
      // dodawanie okrągłych ścian do tablicy
      addWallsCircle() {
        this.wallsCircle.push(new WallCircle(cw/12, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw / 12)+4*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw/12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw/12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((5*cw/12)+this.length+3*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle(9.5*cw / 12, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((2.5*cw/12)+this.length+3*this.radius, this.bottomRowCircle));
        this.wallsCircle.push(new WallCircle(8.5*cw/12, this.bottomRowCircle));
    
        return this.wallsCircle;
      }
        
      // rysowanie okrągłych ścian
      drawWalls(arr1){
      let i=0;
      
      for (i; i<arr1.length; i++){
        if (arr1[i].type === 'circl'){
            ctx.beginPath();
            arr1[i].drawCirc();
            ctx.closePath();
        } 
        
      }
      }
    
    }

export default WallCircle;