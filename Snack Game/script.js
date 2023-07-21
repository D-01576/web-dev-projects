let snack = document.querySelector(".snack");
let score = document.querySelector(".score");
let fruit = document.querySelector(".fruit");
let main = document.querySelector(".main");
let inputDir = {x: 0, y:0}
const foodSound = new Audio("music/food.mp3")
const moveSound = new Audio("music/move.mp3")
const gameOverSound = new Audio("music/gameover.mp3")
let gameover = false;
let x = 3;
let y = 7;
let fruitX = Math.floor(Math.random() * 16);
let fruitY = Math.floor(Math.random() * 16);
let scrore = 0;
let speed = 200;
let animationTimeout;

fruit.style.gridColumnStart = fruitX;
fruit.style.gridRowStart = fruitY;
snack.style.gridColumnStart = x;
snack.style.gridRowStart = y;

window.addEventListener("keypress", (e) => {
    clearTimeout(animationTimeout);

    if (e.key === "a") {
        moveSound.play();
        moveLeft();
    } else if (e.key === "w") {
        moveSound.play();
        moveUp()
    } else if (e.key === "d") {
        moveSound.play();
        moveRight();
    } else if (e.key === "s") {
        moveSound.play();
        moveDown()
    }
});

function createNewFruit() {
    fX = Math.floor(Math.random() * 16);
    fY = Math.floor(Math.random() * 16);
    fruit.style.gridColumnStart = fX;
    fruit.style.gridRowStart = fY;
}

function checkCollision() {
    const snackRect = snack.getBoundingClientRect();
    const fruitRect = fruit.getBoundingClientRect();
    if (
        snackRect.left === fruitRect.left &&
        snackRect.top === fruitRect.top
    ) {
        foodSound.play()
        fruitX = Math.floor(Math.random() * 16);
        fruitY = Math.floor(Math.random() * 16);
        createNewFruit();
        scrore++;
        score.innerHTML = "Score: " + scrore;
    }
}

function moveLeft() {
    if (x > 0) {
        x--;
        snack.style.gridColumnStart = x;
        if (x === 0) {
            gameOverSound.play();
            alert("Game Over score was " + scrore);
            fruitX = Math.floor(Math.random() * 16);
            fruitY = Math.floor(Math.random() * 16);
            scrore = 0;
            score.innerHTML = "Score: " + scrore;
        }
        checkCollision();
        animationTimeout = setTimeout(moveLeft, speed);
    }
}

function moveRight() {
    if (x <= 18) {
        x++;
        snack.style.gridColumnStart = x;
        if (x === 19) {
            gameOverSound.play();
            alert("Game Over score was " + scrore);
            fruitX = Math.floor(Math.random() * 16);
            fruitY = Math.floor(Math.random() * 16);
            scrore = 0;
            score.innerHTML = "Score: " + scrore;
        }
        checkCollision();
        animationTimeout = setTimeout(moveRight, speed);
    }
}

function moveUp() {
    if (y > 0) {
        y--;
        snack.style.gridRowStart = y;
        if (y === 0) {
            gameOverSound.play();
            alert("Game Over score was " + scrore);
            fruitX = Math.floor(Math.random() * 16);
            fruitY = Math.floor(Math.random() * 16);
            scrore = 0;
            score.innerHTML = "Score: " + scrore;
        }
        checkCollision();
        animationTimeout = setTimeout(moveUp, speed);
    }
}

function moveDown() {
    if (y <= 18) {
        y++;
        snack.style.gridRowStart = y;
        if (y === 19) {
            gameOverSound.play();
            alert("Game Over score was " + scrore);
            fruitX = Math.floor(Math.random() * 16);
            fruitY = Math.floor(Math.random() * 16);
            scrore = 0;
            score.innerHTML = "Score: " + scrore;
        }
        checkCollision();
        animationTimeout = setTimeout(moveDown, speed);
    }
}
