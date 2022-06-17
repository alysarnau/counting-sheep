// premise of the game is you control a sprite(dog) that has to "collect" other sprites (sheep)
// there are wolves (other obstacles) that you need to avoid? 
// it's a time trial! P1 versus P2, fastest one wins!
// on starting gameLoop, set page background audio to 

//define body 
const body = document.querySelector('body');

// define canvas object
const game = document.querySelector('#game-canvas');
const ctx = game.getContext('2d');

// set width and height!
game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

//define starting lost sheep
let lostSheepCounter = 10;

class Sheep {
    // classes can ALSO have (and usually do) a constructor function!
    // this is how we tell our class exactly how we want to build our objects
    // this also allows us to use the keyword 'this' in reference to whatever object has been made by the class
    //any attributes that are variable go into the constructor function!
    constructor(x, y, color, width, height) {
        // this is how I define what my objects will be made of
        // because these will be in an object, need to separate by commas
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        // anything that is going to be the same for all instances of the objects we create, we can hard set the value here and leave that out of the constructor.
        // and these are all referring to the parameters we're setting up in the constructor function
        this.lost = true,
        // we can also add methods!
        // in our case, the method is going to be the render method
        this.render = function() {
            // here is where we start interacting with the canvas!
            // we set the fillStyle and the fillRect
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// CREATE PLAYER AND SHEEP
let player = new Sheep (200, 200, 'brown', 20, 20)
let sheep1 = new Sheep(10, 10, 'white', 16, 16);
let sheep2 = new Sheep(50, 50, 'white', 16, 16);
let sheep3 = new Sheep(100, 30, 'white', 16, 16);
let sheep4 = new Sheep(30, 300, 'white', 16, 16);
let sheep5 = new Sheep(500, 125, 'white', 16, 16);
let sheep6 = new Sheep(125, 500, 'white', 16, 16);
let sheep7 = new Sheep(400, 400, 'white', 16, 16);
let sheep8 = new Sheep(350, 100, 'white', 16, 16);
let sheep9 = new Sheep(100, 350, 'white', 16, 16);
let sheep10 = new Sheep(500, 500, 'white', 16, 16);

// timer display and counting function
let currentTime = 0;
const timerDisplay = document.querySelector("#timer");
timerDisplay.innerText = currentTime;
// timer countUp function
const countUp = () => {
    ++currentTime;
    timerDisplay.innerText = currentTime;
    console.log(currentTime);
}

// define timer
let timer;
// START BUTTON, START TIMER
const startButton = document.querySelector('#start');
startButton.addEventListener('click', (e) => {
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING';
    if (isPlaying = true) {
    backgroundMusic.play();
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
const soundText = document.querySelector('#soundEffect');
// press space to bark?
// const barkButton = document.querySelector('#bark');
// barkButton.addEventListener('click', (e) => {
//     console.log('BARK!')
//     soundText.innerText = 'BARK! BARK!'
//     playAudio('./soundeffects/dog-bark.wav')
// })
// const baaButton = document.querySelector('#baaing');
// baaButton.addEventListener('click', (e) => {
//     console.log('BAA!')
//     soundText.innerText = 'BAA!'
//     playAudio('./soundeffects/baa.wav')
// })

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
})
// need to define player object


//ON COLLISON DOG AND SHEEP, 
    // -1 to lostSheepCounter
    // sheep avatar is removed from canvas (slowly disappears?)
    // baa sound effect plays

    // define win condition!
// lowest timer (aka points) wins!

// DEFINE GAME LOOP
const gameLoop = () => {
    if (sheep1.lost || sheep2.lost || sheep3.lost || sheep4.lost || sheep5.lost || sheep6.lost || sheep7.lost || sheep8.lost || sheep9.lost || sheep10.lost) {
        detectHit();
    }
    ctx.clearRect(0, 0, game.width, game.height)
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
}

// WASD movement
const movementHandler = (e) => {
    switch (e.keyCode) {
        case 87: case 38:
            // moves player up
            player.y -= 10;
            break;
        case 83: case 40:
            // moves player down
            player.y += 10;
            break;
        case 65: case 37:
            // moves player left
            player.x -= 10;
            break;
        case 68: case 39:
            // moves player right
            player.x += 10;
            break;
        default:
    }
}
// collision detection
const detectHit = () => {
    if (player.x < sheep1.x + sheep1.width 
        && player.x + player.width > sheep1.x
        && player.y < sheep1.y + sheep1.height
        && player.y + player.height > sheep1.y) {
            console.log(`Sheep 1 has gone home!`);
            sheep1.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep2.x + sheep2.width 
        && player.x + player.width > sheep2.x
        && player.y < sheep2.y + sheep2.height
        && player.y + player.height > sheep2.y) {
            console.log(`Sheep 2 has gone home!`);
            sheep2.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep3.x + sheep3.width 
        && player.x + player.width > sheep3.x
        && player.y < sheep3.y + sheep3.height
        && player.y + player.height > sheep3.y) {
            console.log(`Sheep 3 has gone home!`);
            sheep3.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep4.x + sheep4.width 
        && player.x + player.width > sheep4.x
        && player.y < sheep4.y + sheep4.height
        && player.y + player.height > sheep4.y) {
            console.log(`Sheep 4 has gone home!`);
            sheep4.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep5.x + sheep5.width 
        && player.x + player.width > sheep5.x
        && player.y < sheep5.y + sheep5.height
        && player.y + player.height > sheep5.y) {
            console.log(`Sheep 5 has gone home!`);
            sheep5.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep6.x + sheep6.width 
        && player.x + player.width > sheep6.x
        && player.y < sheep6.y + sheep6.height
        && player.y + player.height > sheep6.y) {
            console.log(`Sheep 6 has gone home!`);
            sheep6.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep7.x + sheep7.width 
        && player.x + player.width > sheep7.x
        && player.y < sheep7.y + sheep7.height
        && player.y + player.height > sheep7.y) {
            console.log(`Sheep 7 has gone home!`);
            sheep7.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep8.x + sheep8.width 
        && player.x + player.width > sheep8.x
        && player.y < sheep8.y + sheep8.height
        && player.y + player.height > sheep8.y) {
            console.log(`Sheep 8 has gone home!`);
            sheep8.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep9.x + sheep9.width 
        && player.x + player.width > sheep9.x
        && player.y < sheep9.y + sheep9.height
        && player.y + player.height > sheep9.y) {
            console.log(`Sheep 9 has gone home!`);
            sheep9.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    } else if (player.x < sheep10.x + sheep10.width 
        && player.x + player.width > sheep10.x
        && player.y < sheep10.y + sheep10.height
        && player.y + player.height > sheep10.y) {
            console.log(`Sheep 10 has gone home!`);
            sheep10.lost = false;
            //document.getElementById('status').textContent = 'You win!'
    }
}