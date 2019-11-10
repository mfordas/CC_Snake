import { canvas } from './main';
import NormalFood from './foods/normalFood';
import ComboFood from './foods/comboFood';
import SuperFood from './foods/superFood';
import WeakeningFood from './foods/weakeningFood';

//klasa zarządzająca jedzeniem

class FoodManager {
    constructor(foodSize, snake) {
        this.foodOnMap = [];
        this.recentlyEaten = [new NormalFood(0, 0, 0), new NormalFood(0, 0, 0), new NormalFood(0, 0, 0)];
        this.maxFoodCount = 3;
        this.foodSize = foodSize;
        this.multiplier = 1;
        this.snake = snake;
        this.refreshFood();
    }

    //sprawdza czy głowa dotarła do jedzenia
    headEat() {
        this.foodOnMap = this.foodOnMap.filter(food => {
            if ((food.x + 10 <= this.snake.x + this.snake.cell && food.x + food.size - 10 >= this.snake.x) &&
                (food.y + 10 <= this.snake.y + this.snake.cell && food.y + food.size - 10 >= this.snake.y)) {

                this.recentlyEaten.shift();
                this.recentlyEaten.push(food);

                food.eat(this.multiplier);

                return false;
            }
            return true;
        });
    }

    //umiejscawia jedzenie na planszy
    placeApple() {
        let nextX = Math.floor(Math.random() * (canvas.width - this.foodSize));
        let nextY = Math.floor(Math.random() * (canvas.height - this.foodSize));
        let foodType = Math.floor(Math.random() * 100);

        if (foodType < 55) {
            this.foodOnMap.push(new NormalFood(nextX, nextY, this.foodSize, this.snake, this));
        } else if (foodType < 90) {
            this.foodOnMap.push(new ComboFood(nextX, nextY, this.foodSize, this.snake, this));
        } else if (foodType < 98) {
            this.foodOnMap.push(new WeakeningFood(nextX, nextY, this.foodSize, this.snake, this));
        } else {
            this.foodOnMap.push(new SuperFood(nextX, nextY, this.foodSize, this.snake, this));
        }
    }

    //sprawdza czy na planszy brakuje jedzenia
    foodGenerator() {
        if (this.foodOnMap.length < this.maxFoodCount) 
            this.placeApple();
    }

    //rysuje jedzenie na planszy
    drawFood() {
        this.foodOnMap.forEach(food => {
            food.draw();
        });
    }

    //usuwa najstarsze jedzenie na planszy w przedziale 5-10 sekund
    async refreshFood() {
        this.foodOnMap.splice(0, 1);
        let timeout = Math.floor(Math.random() * 5000);
        await sleep(5000 + timeout);
        this.refreshFood();
    }

    //funkcje wymagające odświeżania co klatkę
    manageFood() {
        this.headEat();
        this.foodGenerator();
        this.drawFood();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default FoodManager;
