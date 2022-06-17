//define body 
const body = document.querySelector('body');

// define canvas object
const game = document.querySelector('#game-canvas');
const ctx = game.getContext('2d');

// set width and height!
game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

class Sheep {
    constructor(x, y, color, width, height, lost) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.lost = lost,
        this.render = function() {
            // this creates little rectangle sprites
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// CREATE PLAYER AND SHEEP
let player = new Sheep (490, 240, 'brown', 20, 20, false)

let sheep1 = new Sheep(10, 10, 'white', 16, 16, true);
let sheep2 = new Sheep(50, 50, 'white', 16, 16, true);
let sheep3 = new Sheep(100, 30, 'white', 16, 16, true);
let sheep4 = new Sheep(30, 300, 'white', 16, 16, true);
let sheep5 = new Sheep(70, 70, 'white', 16, 16, true);
let sheep6 = new Sheep(125, 300, 'white', 16, 16, true);
let sheep7 = new Sheep(400, 400, 'white', 16, 16, true);
let sheep8 = new Sheep(350, 100, 'white', 16, 16, true);
let sheep9 = new Sheep(100, 350, 'white', 16, 16, true);
let sheep10 = new Sheep(300, 300, 'white', 16, 16, true);

// should I make an array to hold these lost sheep?
const lostSheepArray = [sheep1, sheep2, sheep3, sheep4, sheep5, sheep6, sheep7, sheep8, sheep9, sheep10]

// define this now for win condition
let foundSheepArray;

// timer display and counting function
let currentTime = 0;
const timerDisplay = document.querySelector("#timer");
timerDisplay.innerText = currentTime;
// timer countUp function
const countUp = () => {
    ++currentTime;
    timerDisplay.innerText = currentTime;
}

// define timer
let timer;
// START BUTTON, START TIMER
const startButton = document.querySelector('#start');
startButton.addEventListener('click', (e) => {
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING';
    if (isPlaying = true) {
    //DISABLING BACKGROUND MUSIC FOR TESTING
    //backgroundMusic.play();
    }
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})
// STOP/PAUSE BUTTON
const stopButton = document.querySelector('#stop');
stopButton.addEventListener('click', (e) => {
    clearInterval(timer);
    startButton.innerText = 'RESTART'
    backgroundMusic.pause();
})
// RESET BUTTON
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    clearTimeout(timer);
    currentTime = 0;
    timerDisplay.innerText = currentTime;
    startButton.innerText = 'START'
    soundEffect.innerText = '';
    backgroundMusic.pause();
    // clear canvas!
})

//define soundeffects
const backgroundMusic = new Audio('./soundeffects/backgroundmusic.mp3')
const bark = new Audio('./soundeffects/bark.wav');
const baa = new Audio('./soundeffects/baa.wav');
// stops sound effects from looping
bark.loop = false;
baa.loop = false;
const soundText = document.querySelector('#soundEffect');
// press space to bark?


//logic for toggle background music function
let isPlaying = false;
function togglePlay() {
    isPlaying ? backgroundMusic.pause() : backgroundMusic.play();
}
backgroundMusic.onplaying = function() {
    isPlaying = true;
}
backgroundMusic.onpause = function() {
    isPlaying = false;
}
// toggle background music onclick button functionality
const toggleMusicButton = document.querySelector('#toggle-music');
toggleMusicButton.addEventListener('click', (e) => {
    togglePlay();
    //unfocus after click
    e.target.blur();
})

// WASD movement
const movementHandler = (e) => {
    switch (e.keyCode) {
        case 87: case 38:
            // moves player up
            if (player.y > 0) {
            player.y -= 10;}
            break;
        case 83: case 40:
            // moves player down
            if ((player.y + player.height) < game.height)
            player.y += 10;
            break;
        case 65: case 37:
            // moves player left
            if (player.x > 0)
            {player.x -= 10;}
            break;
        case 68: case 39:
            // moves player right
            if ((player.x + player.width) < game.width)
            {player.x += 10;}
            break;
        case 32:
            // bark sound!
            bark.play();
        default:
    }
}
// DEFINE GAME LOOP
const gameLoop = () => {
    if (sheep1.lost || sheep2.lost || sheep3.lost || sheep4.lost || sheep5.lost || sheep6.lost || sheep7.lost || sheep8.lost || sheep9.lost || sheep10.lost) {
        detectHit();
    }
    ctx.clearRect(0, 0, game.width, game.height)
    // render players and sheep
    player.render()
    if (sheep1.lost) {
        sheep1.render();
    } 
    if (sheep2.lost) {
        sheep2.render();
    }
    if (sheep3.lost) {
        sheep3.render();
    }
    if (sheep4.lost) {
        sheep4.render();
    }
    if (sheep5.lost) {
        sheep5.render();
    }
    if (sheep6.lost) {
        sheep6.render();
    }
    if (sheep7.lost) {
        sheep7.render();
    }
    if (sheep8.lost) {
        sheep8.render();
    }
    if (sheep9.lost) {
        sheep9.render();
    }
    if (sheep10.lost) {
        sheep10.render();
    }
    // set up sheep gone home notification and baa
    // temporary!!! this doesn't work on a loop
    //if (!sheep1.lost || !sheep2.lost|| !sheep3.lost || !sheep4.lost || !sheep5.lost || !sheep6.lost ||){
    //     baa.play();
    // }
    foundSheepArray = lostSheepArray.map(sheep => {
        return (!sheep.lost)
    })
    // if foundSheepArray has 10 true elements, then it's a win
    if (foundSheepArray === [true, true, true, true, true, true, true, true, true, true]) {
        console.log('you won!')
    }
}

// collision detection
const detectHit = () => {
    if (player.x < sheep1.x + sheep1.width 
        && player.x + player.width > sheep1.x
        && player.y < sheep1.y + sheep1.height
        && player.y + player.height > sheep1.y) {
            baa.play();
            sheep1.lost = false;
    } else if (player.x < sheep2.x + sheep2.width 
        && player.x + player.width > sheep2.x
        && player.y < sheep2.y + sheep2.height
        && player.y + player.height > sheep2.y) {
            baa.play();
            sheep2.lost = false;
    } else if (player.x < sheep3.x + sheep3.width 
        && player.x + player.width > sheep3.x
        && player.y < sheep3.y + sheep3.height
        && player.y + player.height > sheep3.y) {
            baa.play();
            sheep3.lost = false;
    } else if (player.x < sheep4.x + sheep4.width 
        && player.x + player.width > sheep4.x
        && player.y < sheep4.y + sheep4.height
        && player.y + player.height > sheep4.y) {
            baa.play();
            sheep4.lost = false;
    } else if (player.x < sheep5.x + sheep5.width 
        && player.x + player.width > sheep5.x
        && player.y < sheep5.y + sheep5.height
        && player.y + player.height > sheep5.y) {
            baa.play();
            sheep5.lost = false;
    } else if (player.x < sheep6.x + sheep6.width 
        && player.x + player.width > sheep6.x
        && player.y < sheep6.y + sheep6.height
        && player.y + player.height > sheep6.y) {
            baa.play();
            sheep6.lost = false;
    } else if (player.x < sheep7.x + sheep7.width 
        && player.x + player.width > sheep7.x
        && player.y < sheep7.y + sheep7.height
        && player.y + player.height > sheep7.y) {
            baa.play();
            sheep7.lost = false;
    } else if (player.x < sheep8.x + sheep8.width 
        && player.x + player.width > sheep8.x
        && player.y < sheep8.y + sheep8.height
        && player.y + player.height > sheep8.y) {
            baa.play();
            sheep8.lost = false;
    } else if (player.x < sheep9.x + sheep9.width 
        && player.x + player.width > sheep9.x
        && player.y < sheep9.y + sheep9.height
        && player.y + player.height > sheep9.y) {
            baa.play();
            sheep9.lost = false;
    } else if (player.x < sheep10.x + sheep10.width 
        && player.x + player.width > sheep10.x
        && player.y < sheep10.y + sheep10.height
        && player.y + player.height > sheep10.y) {
            baa.play();
            sheep10.lost = false;
    }
}

