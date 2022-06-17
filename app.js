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
let player = new Sheep (200, 200, 'brown', 20, 20)
let sheep1 = new Sheep(10, 10, 'white', 16, 16);
let sheep2 = new Sheep(50, 50, 'white', 16, 16);

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
//TO DO: need to display that timer onscreen

// define timer
let timer;
// START BUTTON, START TIMER
const startButton = document.querySelector('#start');
startButton.addEventListener('click', (e) => {
    // this defines the setInterval event
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING';
    if (isPlaying = true) {
    backgroundMusic.play();
    }
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

// render player object



// define and render sheep
// CREATE SHEEP

//ON COLLISON DOG AND SHEEP, 
    // -1 to lostSheepCounter
    // sheep avatar is removed from canvas (slowly disappears?)
    // baa sound effect plays

    // define win condition!
// lowest timer (aka points) wins!


const gameLoop = () => {
    if (sheep1.lost || sheep2.lost) {
        detectHit();
    }
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    if (sheep1.lost) {
        sheep1.render();
    }
}

