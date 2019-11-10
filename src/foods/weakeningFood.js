import AbstractFood from './abstractFood';

const weakeningFoodImg = new Image();
weakeningFoodImg.src = '/src/foods/img/rottenApple.png';

//Osłabiające jedzenie - po zjedzeniu przez 10 sekund ruch jest nieregularny

class WeakeningFood extends AbstractFood {
    constructor(x, y, size) {
        super(x, y, size);
        this.img = weakeningFoodImg;
        this.name = 'Weakening Food';
    }
    

    async eatFood() {
        this.irregularMove();
    }
}

export default WeakeningFood;