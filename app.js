// TO DO:
// ADD PADDING
// implement wolf that chases?
    //https://stackoverflow.com/questions/27533331/problems-making-enemy-follow-moving-player

const body = document.querySelector('body');
const leaderboardContainer = document.querySelector('#leaderboard-container');
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
document.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
        bark.play()
    }
})

class Dog {
    constructor() {
        this.x = 490,
        this.y = 240,
        this.width = 40,
        this.height = 40,
        this.won = false,
        this.score = null,
        this.speed = 10,
        this.src = null,
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
player.src = './sprites/right/sprite0.png'

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
const instructionDiv = document.getElementById('instructions');

let spriteOne = new Sprite(250, './sprites/right/sprite0.png');
let spriteTwo = new Sprite(400, './sprites/right/sprite1.png');
let spriteThree = new Sprite(560,'./sprites/right/sprite2.png');
let spriteFour = new Sprite(710,'./sprites/right/sprite3.png')
const spriteArray = [spriteOne, spriteTwo, spriteThree, spriteFour]

class Sheep {
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 40)),
        this.y = Math.floor(Math.random() * (game.height - 40)),
        this.width = 40,
        this.height = 40,
        this.lost = true,
        this.render = function() {
            let sheepSprite = document.createElement('img');
            sheepSprite.src = "./sprites/White-sheep.png";
            ctx.drawImage(sheepSprite, this.x, this.y, this.width, this.height)
        }
    }
}

class Wolf {
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 60)),
        this.y = Math.floor(Math.random() * (game.height - 60)),
        this.width = 60,
        this.height = 60,
        this.lost = true,
        this.render = function() {
            let sheepSprite = document.createElement('img');
            sheepSprite.src = "./sprites/wolfhowl.png";
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
    clearInterval(winAnimation);
    background.src = "./background/background_tiles.png"
    timerDisplay.innerText = currentTime;
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
    if (prePlayText === confirmPlayerText) {
        confirmSelect();
    }
}

const confirmSelect = () => {
    if (player.x < 610 
        && player.x + player.width > 390
        && player.y < 350
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

let badWolf = new Wolf();

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
    backgroundMusic.play();
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
    backgroundMusic.play();
    }
    startButton.style.display = "none";
    trackMovement();
    player.movePlayer();
}
function resetGame() {
    leaderboard = []
    clearInterval(timer);
    currentTime = 0;
    clearInterval(selectInterval);
    clearInterval(gameInterval);
    resetPlayerPosition();
    timerDisplay.innerText = currentTime;
    startButton.innerText = 'START'
    backgroundMusic.pause();
    startButton.style.pointerEvents = 'inline-block';
    ctx.clearRect(0, 0, game.width, game.height);
    background.src = "./background/startScreen.png";
    ctx.drawImage(background,0,0);
    startButton.style.display = "inline-block";
    lostSheepArray.forEach((sheep) => {
        sheep.lost = false;
    });
    player.won = true;
    clearInterval(winAnimation)
}

function resetPlayerPosition() {
    player.x = 490;
    player.y = 240;
    rightSpriteChange();
}

startButton.addEventListener('click', (e) => {
    instructionDiv.style.display = 'none';
    game.style.display = 'block';
    selectScreen()
    startButton.style.pointerEvents = 'none';
    e.target.blur();
    leaderboard = [];
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
        toggleScoresButton.innerText = "HIDE HI SCORES";
        clearScoreButton.style.display = 'block';
    } else {
        leaderboardContainer.style.display = 'none'
        toggleScoresButton.innerText = "VIEW HI SCORES";
        clearScoreButton.style.display = 'none';
    }
})
toggleMusicButton.addEventListener('click', (e) => {
    togglePlay();
    e.target.blur();
})

const backgroundMusic = new Audio('./soundeffects/backgroundmusic.mp3')
const bark = new Audio('./soundeffects/dog-bark.wav');
const baa = new Audio('./soundeffects/baa.wav');
backgroundMusic.loop = true;
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
            ////sheep
            if (thing.width === 40) {
                baa.play();
            }
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
        lostSheepArray.forEach((lostSheep) => {
            if (lostSheep.lost) {
                lostSheep.render();
                detectHit(lostSheep);
            }
        })
        if (!badWolf.alive) {
            badWolf.render();
        }
    }
}

let leaderboard = [];
function checkWin() {
    if (!sheep1.lost && !sheep2.lost && !sheep3.lost && !sheep4.lost && !sheep5.lost && !sheep6.lost && !sheep7.lost && !sheep8.lost && !sheep9.lost && !sheep10.lost) {
        rightSpriteChange()
        const paddedScore = currentTime.toString().padStart(2,'0');
        let index = Math.floor(Math.random() * 5000);
        let localPush = {
            'playerAvatar' : player.src,
            'playerScore' : paddedScore,
        }
        localStorage.setItem(`playerInfo${index}`, JSON.stringify(localPush));
        updateLeaderboard()
        player.won = true;
        ctx.clearRect(0, 0, game.width, game.height)
        ctx.drawImage(background,0,0);
        winGame();
    }
}

function updateLeaderboard() {
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        leaderboard.push(localStorage.getItem(keys[i]));
    }
    return leaderboard;
}

let winAnimation;
let waggingCorgi = new Image();
function setWinVariant() {
    if (player.src.includes('sprite0.png')) {
        waggingCorgi.src = './sprites/corgi_pembroke_fawn_wag.png';
    } else if (player.src.includes('sprite1.png')) {
        waggingCorgi.src = './sprites/corgi_wagging_idle.png';
    } else if (player.src.includes('sprite2.png')) {
        waggingCorgi.src = './sprites/corgi_pembroke_tri_wag.png';
    } else if (player.src.includes('sprite3.png')) {
        waggingCorgi.src = './sprites/corgi_cardigan_tri_wag.png';
    }
}

let happySheep = new Image();
happySheep.src = './sprites/sheep_idle_col5.png'
let row = 0;
let column = 0;
let numRows = 1
let numColumns = 5;
let frameHeight = 64;
let frameWidth = 64;
let currentFrame = 0;

function winGame () {
    clearInterval(timer);
    clearInterval(gameInterval);
    currentTime = 0;
    setWinVariant();
    winAnimation = setInterval(function() {
        currentFrame++;
        let maxFrame = numColumns * numRows - 1;
        if (currentFrame > maxFrame){
            currentFrame = 0;
        }
        let column = currentFrame % numColumns;
        let row = Math.floor(currentFrame / numColumns);
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.drawImage(background,0,0);
        announceWin();
        ctx.drawImage(waggingCorgi, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 450, 200, frameWidth*1.5, frameHeight*1.5);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 267, 300, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 364, 300, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 461, 300, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 558, 300, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 655, 300, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 267, 375, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 364, 375, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 461, 375, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 558, 375, 80, 80);
        ctx.drawImage(happySheep, column * 192, row * 192, 192, 192, 655, 375, 80, 80);
    }, 100);
    startButton.style.display = 'inline-block';
    startButton.innerText = 'PLAY AGAIN?'
    startButton.style.pointerEvents = 'auto';
    pauseButton.style.display = 'none';
    resetPlayerPosition();
    populateLeaderboard(leaderboard);
}
function announceWin() {
    ctx.fillStyle = 'white'; 
    ctx.textAlign = 'center'; 
    ctx.font = '50px Comic Sans MS';
    ctx.fillText('YOU WON!', game.width/2, game.height/3);
}

function compare(a,b) {
    let thisScore;
    let nextScore;
    thisScore = a.substr(61,2);
    nextScore = b.substr(61,2);
    if (thisScore < nextScore) {
        return -1;
    } else if (thisScore > nextScore) {
        return 1;
    }
    return 0;
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
        playerScore.innerHTML = `<img src=${score.substr(16,29)} /> ${score.substr(61,2)}`;
        leaderboardList.appendChild(playerScore);
    })
}

const clearScoreButton = document.getElementById('clear-scores')
clearScoreButton.addEventListener('click', (e) => {
    localStorage.clear();
    if (leaderboardList.hasChildNodes()) {
        while (leaderboardList.firstChild) {
            leaderboardList.removeChild(leaderboardList.firstChild)
        }
    }
})


