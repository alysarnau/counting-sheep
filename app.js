// TO DO'S
// RE-COMPLICATE LEADERBOARD
// set up keydown listener for bark sound 
    // 32:
    //             bark.play();

// KNOWN BUGS
// get background music to loop!

// BEFORE LAUNCH
// make sure to re-enable background music on Start!
// doublecheck attribution and update readme

// STRETCH GOALS
// Persistent Leaderboard on local storage
// dog and sheep sprite animation

const body = document.querySelector('body');
const leaderboardContainer = document.querySelector('#leaderboard-container')
const leaderboardList = document.querySelector('#leaderboard-list');
const game = document.querySelector('#game-canvas');
const ctx = game.getContext('2d');

let background = new Image();
background.src = "./background/startScreen.png";
background.onload = function() {
    ctx.drawImage(background,0,0);
}

game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

class Dog {
    constructor() {
        this.x = 490,
        this.y = 240,
        this.width = 40,
        this.height = 40,
        this.won = false,
        this.score = null,
        this.speed = 10,
        this.src = './sprites/right/sprite0.png',
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }
    setDirection = function (key) {
        if (key.toLowerCase() == 'w') { this.direction.up = true }
        if (key.toLowerCase() == 'a') { this.direction.left = true }
        if (key.toLowerCase() == 's') { this.direction.down = true }
        if (key.toLowerCase() == 'd') { this.direction.right = true }
    }
    unSetDirection = function (key) {
        if (key.toLowerCase() == 'w') { this.direction.up = false }
        if (key.toLowerCase() == 'a') { this.direction.left = false }
        if (key.toLowerCase() == 's') { this.direction.down = false }
        if (key.toLowerCase() == 'd') { this.direction.right = false }
    }
    movePlayer = function () {
        if (this.direction.up) {
            this.y -= this.speed
            if (this.y <= 0) {
                this.y = 0
            }
        }
        if (this.direction.left) {
            this.x -= this.speed
            leftSpriteChange()
            if (this.x <= 0) {
                this.x = 0
            }
        }
        if (this.direction.down) {
            this.y += this.speed
            if (this.y + this.height >= game.height) {
                this.y = game.height - this.height
            }
        }
        if (this.direction.right) {
            this.x += this.speed
            rightSpriteChange()
            if (this.x + this.width >= game.width) {
                this.x = game.width - this.width
            }
        }
    }
    render = function () {
        let playerSprite = document.createElement('img');
        playerSprite.src = player.src;
        ctx.drawImage(playerSprite, this.x, this.y, this.width, this.height)
    }
}

class Sprite {
    constructor(x, src) {
        this.x = x,
        this.y = 115,
        this.width = 40,
        this.height = 40,
        this.chosen = false;
        this.delete = false;
        this.src = src;
        this.render = function() {
            let spriteImage = document.createElement('img');
            spriteImage.src = `${this.src}`
            ctx.drawImage(spriteImage, this.x, this.y, this.width, this.height)
        }
    }
}

let player = new Dog();

let timer;
let gameInterval;
let selectInterval;

const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');
const resetButton = document.querySelector('#reset');
const toggleMusicButton = document.querySelector('#toggle-music');
const toggleScoresButton = document.querySelector('#toggle-leaderboard');
const timerDisplay = document.querySelector("#timer");

let spriteOne = new Sprite(250, './sprites/right/sprite0.png');
let spriteTwo = new Sprite(400, './sprites/right/sprite1.png');
let spriteThree = new Sprite(560,'./sprites/right/sprite2.png');
let spriteFour = new Sprite(710,'./sprites/right/sprite3.png')
const spriteArray = [spriteOne, spriteTwo, spriteThree, spriteFour]

class Sheep {
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 25)),
        this.y = Math.floor(Math.random() * (game.height - 25)),
        this.width = 30,
        this.height = 30,
        this.lost = true,
        this.render = function() {
            let sheepSprite = document.createElement('img');
            sheepSprite.src = "./sprites/White-sheep.png";
            ctx.drawImage(sheepSprite, this.x, this.y, this.width, this.height)
        }
    }
}

function trackMovement() {
    document.addEventListener('keydown', (e) => {
        player.setDirection(e.key)
    })
    document.addEventListener('keyup', (e) => {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            player.unSetDirection(e.key)
        }
    })
}

const chooseYourPlayerText = 'Choose Your Player'
const confirmPlayerText = 'Confirm?'
let prePlayText;

function selectScreen(){
    background.src = "./background/background_tiles.png"
    timerDisplay.innerText = currentTime;
    player.x = 490;
    player.y = 240;
    currentTime = 0;
    prePlayText = chooseYourPlayerText;
    selectInterval = setInterval(selectLoop, 60);
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block'
}


function selectLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background,0,0);
    ctx.fillStyle = "white"; 
    ctx.textAlign = "center"; 
    ctx.font = "50px Comic Sans MS";
    ctx.fillText(prePlayText, game.width/2, (2*game.height)/3);
    trackMovement();
    player.movePlayer();
    if (!spriteOne.delete) {
        spriteOne.render();
        selectHit(spriteOne);
    }
    if (!spriteTwo.delete) {
        spriteTwo.render();
        selectHit(spriteTwo);
    }
    if (!spriteThree.delete) {
        spriteThree.render();
        selectHit(spriteThree);
    }
    if (!spriteFour.delete) {
        spriteFour.render();
        selectHit(spriteFour);
    }
    player.render();
    //selectHit();
    if (prePlayText === confirmPlayerText) {
        confirmSelect();
    }
}

const confirmSelect = () => {
    if (player.x < 720 
        && player.x + player.width > 270
        && player.y < 370
        && player.y + player.height > 290) {
            confirmStart()
        }
}

const confirmStart = () => {
    clearInterval(selectInterval);
    spriteArray.forEach = (sprite) => {sprite.delete === true}
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background,0,0);
    beginGame();
    gameInterval = setInterval(gameLoop, 60);
}

function selectHit(sprite) {
    if (player.x < sprite.x + sprite.width
        && player.x + player.width > sprite.x
        && player.y < sprite.y + sprite.height
        && player.y + player.height > sprite.y) {
            player.src = sprite.src
            prePlayText = confirmPlayerText;
        }
}

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
let foundSheepArray;

let currentTime = 0;
timerDisplay.innerText = currentTime;
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
    trackMovement();
    player.movePlayer();
    pauseButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
    startButton.style.display = "none";
}
function resumeGame() {
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING';
    if (isPlaying = true) {
    //DISABLING BACKGROUND MUSIC FOR TESTING
    //backgroundMusic.play();
    }
    startButton.style.display = "none";
    trackMovement();
    player.movePlayer();
}
function resetGame() {
    clearInterval(timer);
    currentTime = 0;
    clearInterval(gameInterval);
    timerDisplay.innerText = currentTime;
    startButton.innerText = 'START'
    backgroundMusic.pause();
    startButton.style.pointerEvents = 'inline-block';
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background,0,0);
    startButton.style.display = "inline-block";
    lostSheepArray.forEach((sheep) => {
        sheep.lost = false;
    });
    player.won = true;
}

startButton.addEventListener('click', (e) => {
    game.style.display = 'block';
    leaderboardContainer.style.display = 'none';
    selectScreen()
    startButton.style.pointerEvents = 'none';
    e.target.blur();
})
pauseButton.addEventListener('click', (e) => {
    clearInterval(timer);
    clearInterval(gameInterval);
    startButton.innerText = 'RESTART'
    backgroundMusic.pause();
    startButton.style.pointerEvents = 'auto';
    resumeButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
})
resumeButton.addEventListener('click', (e) => {
    resumeGame();
    gameInterval = setInterval(gameLoop,60);
    resumeButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
})
resetButton.addEventListener('click', (e) => {
    resetGame();
    startButton.style.display = 'inline-block';
    startButton.style.pointerEvents = 'auto';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    resetButton.style.display = 'none';
})
toggleScoresButton.addEventListener('click', (e) => {
    if (leaderboardContainer.style.display === 'none') {
        leaderboardContainer.style.display = 'block';
    } else {
        leaderboardContainer.style.display = 'none'
    }
})
toggleMusicButton.addEventListener('click', (e) => {
    togglePlay();
    e.target.blur();
})

const backgroundMusic = new Audio('./soundeffects/backgroundmusic.mp3')
const bark = new Audio('./soundeffects/dog-bark.wav');
const baa = new Audio('./soundeffects/baa.wav');
bark.loop = false;
baa.loop = false;
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

function detectHit(thing) {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.lost = false;
            baa.play();
        }
}

function leftSpriteChange() {
    if (player.src.includes('right')) {
        player.src = player.src.replace('right', 'left')
    }
}
function rightSpriteChange() {
    if (player.src.includes('left')) {
        player.src = player.src.replace('left', 'right')
    }
}

const gameLoop = () => {
    trackMovement();
    player.movePlayer();
    checkWin();
    if (player.won) {
        return;
    } else {
        ctx.clearRect(0, 0, game.width, game.height)
        ctx.drawImage(background,0,0);
        if (!player.won) {
            player.render();
        }
        // refactor this?
        if (sheep1.lost) {
            sheep1.render();
            detectHit(sheep1);
        } 
        if (sheep2.lost) {
            sheep2.render();
            detectHit(sheep2);
        }
        if (sheep3.lost) {
            sheep3.render();
            detectHit(sheep3);
        }
        if (sheep4.lost) {
            sheep4.render();
            detectHit(sheep4);
        }
        if (sheep5.lost) {
            sheep5.render();
            detectHit(sheep5);
        }
        if (sheep6.lost) {
            sheep6.render();
            detectHit(sheep6);
        }
        if (sheep7.lost) {
            sheep7.render();
            detectHit(sheep7);
        }
        if (sheep8.lost) {
            sheep8.render();
            detectHit(sheep8);
        }
        if (sheep9.lost) {
            sheep9.render();
            detectHit(sheep9);
        }
        if (sheep10.lost) {
            sheep10.render();
            detectHit(sheep10);
        }
        foundSheepArray = lostSheepArray.map(sheep => {
            return (!sheep.lost)
        })
    }
}

const leaderboard = [];
function checkWin() {
    if (!sheep1.lost && !sheep2.lost && !sheep3.lost && !sheep4.lost && !sheep5.lost && !sheep6.lost && !sheep7.lost && !sheep8.lost && !sheep9.lost && !sheep10.lost) {
        player.won = true;
        ctx.clearRect(0, 0, game.width, game.height)
        ctx.drawImage(background,0,0);
        winGame();
    }
}

function winGame () {
    clearInterval(timer);
    clearInterval(gameInterval);
    rightSpriteChange()
    leaderboard.push(currentTime)
    player.score = currentTime;
    // leaderboard.push(player);
    currentTime = 0;
    player.x = 490;
    player.y = 240;    
    player.render();
    announceWin();
    startButton.style.display = 'inline-block';
    startButton.innerText = 'PLAY AGAIN?'
    startButton.style.pointerEvents = 'auto';
    pauseButton.style.display = 'none';
    populateLeaderboard(leaderboard);
}
function announceWin() {
    ctx.fillStyle = 'white'; 
    ctx.textAlign = 'center'; 
    ctx.font = '50px Comic Sans MS';
    ctx.fillText('YOU WON!', game.width/2, game.height/3);
}
//changed this for numbers, not players
function compare(a,b) {
    return a - b;
}
function populateLeaderboard(){
    if (leaderboardList.hasChildNodes()) {
        while (leaderboardList.firstChild) {
            leaderboardList.removeChild(leaderboardList.firstChild)
        }
    }
    leaderboard.sort(compare);
    while (leaderboard.length > 10) {
        leaderboard.pop();
    }
    leaderboard.forEach((score) => {
        const playerScore = document.createElement('li');
        playerScore.setAttribute('class','score')
        if (typeof score === 'number') {
            playerScore.innerText = `${score}`;
        }
        leaderboardList.appendChild(playerScore);
    })
}
