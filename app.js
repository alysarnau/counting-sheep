// TO DO STILL
// create pixel background
// fix unpause functionality (it pauses properly, but needs to be able to RESTART)
// Start button should trigger select player screen first
// Need to implement leaderboard screen
// need to set up proper button display (correct buttons displayed/hidden per whiteboard)
// set up scrolling functionality

// STRETCH GOALS
// set up Sprites as avatars
// use sheep pixels instead of rectangles
    // for those, use random # algos to assign up down left or right facing sprites
    // EG: () 
    // function getRandomNum(max) {
    //     return Math.floor(Math.random() * max);
    // }
    // getRandomNum(4)
        //will return 0, 1, 2, or 3
        // if 0, left facing sprite; if 1, right facing sprite; if 2, up facing sprite; if 3 down facing sprite
// Persistent Leaderboard on local storage

//define body 
const body = document.querySelector('body');

// define canvas object
const game = document.querySelector('#game-canvas');
const ctx = game.getContext('2d');

// define background
let background = new Image();
background.src = "./background/background_tiles.png";

background.onload = function() {
    ctx.drawImage(background,0,0);
}

// set width and height!
game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

// define player
let player = {
    x: 490,
    y: 240,
    color: 'brown',
    width: 20,
    height: 20,
    won: false,
    render: function() {
        // this creates little rectangle sprites
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Sprite {
    constructor(x,color) {
        this.x = x,
        this.y = 115,
        this.color = color,
        this.width = 40,
        this.height = 40,
        this.chosen = false;
        this.delete = false;
        this.render = function() {
            // this creates little rectangle sprites
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

let spriteOne = new Sprite(250, 'yellow');
let spriteTwo = new Sprite(400, 'red');
let spriteThree = new Sprite(560,'blue');
let spriteFour = new Sprite(710,'purple')
const spriteArray = [spriteOne, spriteTwo, spriteThree, spriteFour]

class Sheep {
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 25)),
        this.y = Math.floor(Math.random() * (game.height - 25)),
        this.color = 'white',
        this.width = 15,
        this.height = 15,
        this.lost = true,
        this.render = function() {
            // this creates little rectangle sprites
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
// saving this as variable so we can clear it later!
let selectInterval;

function selectScreen(){
    // adds movement
    document.addEventListener('keydown', movementHandler);
    selectInterval = setInterval(selectLoop, 60);
}

const chooseYourPlayerText = 'Choose Your Player'
const confirmPlayerText = 'Confirm?'

let prePlayText = chooseYourPlayerText;
// Setting this as an array so players can change their minds
let playerColor = [];

function selectLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background,0,0);
    ctx.fillStyle = "white"; 
    ctx.textAlign = "center"; 
    ctx.font = "50px Comic Sans MS";
    ctx.fillText(prePlayText, game.width/2, (2*game.height)/3);
    if (!spriteOne.delete) {
        spriteOne.render();
    }
    if (!spriteTwo.delete) {
        spriteTwo.render();
    }
    if (!spriteThree.delete) {
        spriteThree.render();
    }
    if (!spriteFour.delete) {
        spriteFour.render();
    }
    player.render();
    selectHit();
    // hit collision should trigger confirmation screen
    if (prePlayText === confirmPlayerText) {
        confirmSelect();
    }
}

const confirmSelect = () => {
    if (player.x < 720 
        && player.x + player.width > 270
        && player.y < 370
        && player.y + player.height > 290) {
            console.log('begin game')
            confirmStart()
        }
}

const confirmStart = () => {
    clearInterval(selectInterval);
    spriteArray.forEach = (sprite) => {sprite.delete === true}
    console.log(spriteArray);
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background,0,0);
    //this starts the timer
    beginGame();
    //this starts the game
    setInterval(gameLoop, 60);
}

const selectHit = () => {
    if (player.x < spriteOne.x + spriteOne.width 
        && player.x + player.width > spriteOne.x
        && player.y < spriteOne.y + spriteOne.height
        && player.y + player.height > spriteOne.y) {
            player.color = 'yellow';
            playerColor.push('yellow');
            prePlayText = confirmPlayerText;
    } else if (player.x < spriteTwo.x + spriteTwo.width 
        && player.x + player.width > spriteTwo.x
        && player.y < spriteTwo.y + spriteTwo.height
        && player.y + player.height > spriteTwo.y) {
            player.color = 'red';
            playerColor.push('red');
            prePlayText = confirmPlayerText;
    } else if (player.x < spriteThree.x + spriteThree.width 
        && player.x + player.width > spriteThree.x
        && player.y < spriteThree.y + spriteThree.height
        && player.y + player.height > spriteThree.y) {
            player.color = 'blue';
            playerColor.push('blue');
            prePlayText = confirmPlayerText;
    } else if (player.x < spriteFour.x + spriteFour.width 
        && player.x + player.width > spriteFour.x
        && player.y < spriteFour.y + spriteFour.height
        && player.y + player.height > spriteFour.y) {
            player.color = 'purple';
            playerColor.push('purple');
            prePlayText = confirmPlayerText;
    } 
}

// CREATE SHEEP
let sheep1 = new Sheep();
let sheep2 = new Sheep();
let sheep3 = new Sheep();
let sheep4 = new Sheep();
let sheep5 = new Sheep();
let sheep6 = new Sheep();
let sheep7 = new Sheep();
let sheep8 = new Sheep();
let sheep9 = new Sheep();
let sheep10 = new Sheep();

const lostSheepArray = [sheep1, sheep2, sheep3, sheep4, sheep5, sheep6, sheep7, sheep8, sheep9, sheep10]

// define for win condition
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

function beginGame() {
    player.won = false;
    lostSheepArray.forEach((sheep) => {
        sheep.lost = true;
    });
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING';
    if (isPlaying = true) {
    //DISABLING BACKGROUND MUSIC FOR TESTING
    //backgroundMusic.play();
    }
    document.addEventListener('keydown', movementHandler)
}

// define timer
let timer;
const startButton = document.querySelector('#start');

//define game interval
let gameInterval;

// NEED TO UPDATE THIS TO FIRE THE SELECT SCREEN
startButton.addEventListener('click', (e) => {
    beginGame();
    document.addEventListener('keydown', movementHandler)
    // delete this (duplicate) once select screen is all set
    gameInterval = setInterval(gameLoop, 60);
    startButton.style.pointerEvents = 'none';
    e.target.blur();
})
// STOP/PAUSE BUTTON
const stopButton = document.querySelector('#stop');
stopButton.addEventListener('click', (e) => {
    clearInterval(timer);
    startButton.innerText = 'RESTART'
    backgroundMusic.pause();
    startButton.style.pointerEvents = 'auto';
})
// RESET BUTTON
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    resetGame();
    // change startButtonText be visible again
    // hide pause button again
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
})

function resetGame() {
        //clear timer interval and current Time
        clearInterval(timer);
        currentTime = 0;
        clearInterval(gameInterval);
        timerDisplay.innerText = currentTime;
        startButton.innerText = 'START'
        backgroundMusic.pause();
        startButton.style.pointerEvents = 'auto';
        // clear canvas!
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.drawImage(background,0,0);
        startButton.style.display = "inline-block";
        // see if this solves for sheep rendering
        lostSheepArray.forEach((sheep) => {
            sheep.lost = false;
        });
        player.won = true;
}

//define soundeffects
const backgroundMusic = new Audio('./soundeffects/backgroundmusic.mp3')
const bark = new Audio('./soundeffects/dog-bark.wav');
const baa = new Audio('./soundeffects/baa.wav');
// stops sound effects from looping
bark.loop = false;
baa.loop = false;
const soundText = document.querySelector('#soundEffect');

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
    e.target.blur();
})

const movementHandler = (e) => {
    switch (e.keyCode) {
        case 87: case 38:
            if (player.y > 0) {
            player.y -= 10;}
            break;
        case 83: case 40:
            if ((player.y + player.height) < game.height)
            player.y += 10;
            break;
        case 65: case 37:
            if (player.x > 0)
            {player.x -= 10;}
            break;
        case 68: case 39:
            if ((player.x + player.width) < game.width)
            {player.x += 10;}
            break;
        case 32:
            bark.play();
        default:
    }
}

const gameLoop = () => {
    if (sheep1.lost || sheep2.lost || sheep3.lost || sheep4.lost || sheep5.lost || sheep6.lost || sheep7.lost || sheep8.lost || sheep9.lost || sheep10.lost) {
        detectHit();
    checkWin();
    // Stops loop on win
    if (player.won) {
        return;
    } else {
        ctx.clearRect(0, 0, game.width, game.height)
        ctx.drawImage(background,0,0);
        // render players and sheep
        if (!player.won) {
            player.render();
        }
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
        foundSheepArray = lostSheepArray.map(sheep => {
            return (!sheep.lost)
        })
    }
}
    // Hide Start Button when playing
    startButton.style.display = "none";
    stopButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
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

let leaderboard = [];

// check win condition
function checkWin() {
    if (!sheep1.lost && !sheep2.lost && !sheep3.lost && !sheep4.lost && !sheep5.lost && !sheep6.lost && !sheep7.lost && !sheep8.lost && !sheep9.lost && !sheep10.lost) {
        // GAME WON
        player.won = true;
        // this removes all players from game board
        ctx.clearRect(0, 0, game.width, game.height)
        ctx.drawImage(background,0,0);
        winGame();
    }
}

// ON WIN
function winGame () {
    clearInterval(timer);
    leaderboard.push(currentTime);
    currentTime = 0;
    console.log('you won!');
    //reset player location to center
    player.x = 490;
    player.y = 240;    
    player.render();
    // change START BUTTON text to "Play Again?" and re-allow clicks
    announceWin();
    // display startButton again
    startButton.style.display = "block";
    // allow start button again
    startButton.innerText = "PLAY AGAIN?"
    startButton.style.pointerEvents = 'auto';

}

function announceWin() {
    // set font settings for canvas
    ctx.fillStyle = "white"; 
    ctx.textAlign = "center"; 
    ctx.font = "50px Comic Sans MS";
    ctx.fillText("YOU WON!", game.width/2, game.height/3);
}
