import AbstractFood from './abstractFood';

const normalFoodImg = new Image();
normalFoodImg.src = '/src/foods/img/redApple.png';

// Normalne jedzenie - dodaje 1 do długości węża

class NormalFood extends AbstractFood{
    constructor (x, y, size){
        super(x, y, size);
        this.img = normalFoodImg;
        this.name = 'Normal Food';
    }

    eatFood() {};
    
}

export default NormalFood;