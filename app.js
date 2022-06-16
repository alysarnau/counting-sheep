// premise of the game is you control a lil aussie dog that has to "collect" sheep
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


// need to define p1 object and p2 object
const player1 = {
    playername: '1',
    points: 0,
}

// define win condition!
// lowest timer (aka points) wins!

const player2 = {
    playername: '2',
    points: 0,
}
let currentTime = 0;
const timerDisplay = document.querySelector("#timer");
timerDisplay.innerText = currentTime;
// need to create a timer that counts up in seconds
//define countUp funcion
const countUp = () => {
    ++currentTime;
    timerDisplay.innerText = currentTime;
    console.log(currentTime);
}

// define timer
let timer;
// const timer = setInterval(countUp,1000);
const startButton = document.querySelector('#start');
console.log(startButton);
startButton.addEventListener('click', (e) => {
    timer = setInterval(countUp,1000);
    startButton.innerText = 'RUNNING'
})

const stopButton = document.querySelector('#stop');
stopButton.addEventListener('click', (e) => {
    clearTimeout(timer);
    startButton.innerText = 'RESTART'
})


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    clearTimeout(timer);
    currentTime = 0;
    timerDisplay.innerText = currentTime;
    startButton.innerText = 'START'
    soundEffect.innerText = '';
})

// notes for how to get clouds! https://silveiraneto.net/2011/06/02/simple-html5-animation-clouds-over-background/

// need to display that timer onscreen
const sheep = document.createElement('div');
sheep.setAttribute('id','sheep');
canvasBackground.appendChild(sheep);

// need to define lostSheepCounter
// start with 10 lost sheep!
let lostSheepCounter = 10;
// when sheep is touched by the aussie avatar, -1 to lostSheepCounter

//playAudio function
// function playAudio(url) {
//     const audio = document.querySelector(`audio[data-url="${}"]`);
// }

//define soundeffects
const bark = new Audio('./soundeffects/bark.wav');
const baa = new Audio('./soundeffects/baa.wav');
const soundText = document.querySelector('#soundEffect');
// press space to bark?
const barkButton = document.querySelector('#bark');
barkButton.addEventListener('click', (e) => {
    console.log('BARK!')
    soundText.innerText = 'BARK! BARK!'
    playAudio('./soundeffects/dog-bark.wav')
})
const baaButton = document.querySelector('#baaing');
baaButton.addEventListener('click', (e) => {
    console.log('BAA!')
    soundText.innerText = 'BAA!'
    playAudio('./soundeffects/baa.wav')
})



// include background music!