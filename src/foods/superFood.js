import AbstractFood from './abstractFood';
import { fm } from '../main';

const superFoodImg = new Image();
superFoodImg.src = '/src/foods/img/goldenApple.png';

//Super jedzenie - zwiększa maksymalną liczbę jedzenia na planszy

class SuperFood extends AbstractFood{
    constructor (x, y, size){
        super(x, y, size);
        this.img = superFoodImg;
        
        this.name = 'Super Food';
    }

    eatFood() {
       fm.maxFoodCount++;
    }
    
}

export default SuperFood;