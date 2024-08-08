let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    const hours = parseInt((time / (1000 * 60 * 60)) % 24);

    const formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 10 ? "0" : "") + milliseconds;

    display.textContent = formattedTime;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    displayTime(0);
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        lapsList.appendChild(lapTime);
    }
});

displayTime(0);
