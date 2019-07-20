export let N = 10;

export function fun(x, y) {
    return x + y;
}

function g() {
    // без экспорта
}

export class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}