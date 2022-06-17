// premise of the game is you control a sprite(dog) that has to "collect" other sprites (sheep)
// there are wolves (other obstacles) that you need to avoid? 
// it's a time trial! P1 versus P2, fastest one wins!
// on starting gameLoop, set page background audio to 

function playAudio(url) {
    // <embed src="/html/Kalimba.mp3" loop="true" autostart="true" width="2"
    // height="0">
}
//define body 
const body = document.querySelector('body');

// define canvas object
const canvasBackground = document.querySelector('canvas');

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

//define starting lost sheep
let lostSheepCounter = 10;


// need to define player object
const player = {
    missingSheep: lostSheepCounter,
    // on missingSheep = 0, set time to currentTime
    time: undefined,
}
// render player object



// define and render sheep
// CREATE SHEEP

//ON COLLISON DOG AND SHEEP, 
    // -1 to lostSheepCounter
    // sheep avatar is removed from canvas (slowly disappears?)
    // baa sound effect plays

    // define win condition!
// lowest timer (aka points) wins!




