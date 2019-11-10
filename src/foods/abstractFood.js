import {ctx, snake} from '../main';
import { fm } from '../main';

class AbstractFood {
    constructor (x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
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
            snake.expandSnake();
            await sleep(150);
        }
    }

    // Podwojenie mnożnika punktów
    async doubleMultiplier() {
        fm.multiplier *= 2;
        console.log(fm.multiplier);
        await sleep(10000);
        fm.multiplier /= 2;
    }

    // Nieregularny ruch węża
    async irregularMove() {
        for (var i = 0; i < 20; i++) {
            snake.speed *= 1.75;
            await sleep(250);
            snake.speed /= 1.75;
            await sleep(250);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default AbstractFood;