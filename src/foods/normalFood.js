import AbstractFood from './abstractFood';

const normalFoodImg = new Image();
normalFoodImg.src = '/src/foods/img/redApple.png';

// Normalne jedzenie - dodaje 1 do długości węża

class NormalFood extends AbstractFood{
    constructor (x, y, size, snake, foodManager){
        super(x, y, size, snake, foodManager);
        this.img = normalFoodImg;
        this.name = 'Normal Food';
    }

    eatFood() {}
    
}

export default NormalFood;