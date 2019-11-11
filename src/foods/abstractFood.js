import { ctx } from '../main';

class AbstractFood {
    constructor(x, y, size, snake, foodManager) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.snake = snake;
        this.foodManager = foodManager;
        this.toRemove = 0;
    }

    // Rysowanie jedzenia
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }

    // Jedzenie
    async eat(multiplier) {
        console.log(`${this.name} eaten`);
        this.eatFood();

        for (var i = 0; i < multiplier; i++) {
            this.snake.expandSnake();
            await sleep(150);
        }
    }

    // Podwojenie mnożnika punktów
    async doubleMultiplier() {
        this.foodManager.multiplier *= 2;
        console.log(this.foodManager.multiplier);
        await sleep(20000);
        this.foodManager.multiplier /= 2;
    }

    // Nieregularny ruch węża
    async irregularMove() {
        for (var i = 0; i < 20; i++) {
            this.snake.speed *= 2;
            await sleep(250);
            this.snake.speed /= 2;
            await sleep(250);
        }
    }

    splitSnake() {
        let toDelete;
        if (this.snake.tailLength === 1)
            toDelete = 0;
        else {
            toDelete = this.snake.tailLength / 2;
        }
        for (var i = 0; i < toDelete; i++) {
            this.snake.tail.shift();
            this.snake.tailLength--;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default AbstractFood;