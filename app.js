// premise of the game is you control a lil aussie dog that has to "collect" sheep
// it's a time trial! P1 versus P2, fastest one wins!

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
    console.log(currentTime)
}

// define timer
let timer;
// const timer = setInterval(countUp,1000);
const startButton = document.querySelector('#start');
startButton.addEventListener('click', (e) => {
    timer = setInterval(countUp,1000);
})

const stopButton = document.querySelector('#stop');
stopButton.addEventListener('click', (e) => {
    clearTimeout(timer);
})

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (e) => {
    clearTimeout(timer);
    currentTime = 0;
    timerDisplay.innerText = currentTime;
})


// need to display that timer onscreen

// need to create sheep variable

// when sheep is touched by the aussie avatar, +1 to player score

// press space to bark?

// include background music!