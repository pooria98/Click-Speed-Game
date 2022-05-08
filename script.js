const gameInfo = document.querySelector('.game-info');
const closeBtn = document.querySelector('.close-btn');
const checkBox = document.getElementById('check-box');

checkBox.oninput = function(){
    checkBox.toggleAttribute('checked');
};

if (localStorage.getItem("firstTime")==null) {
    gameInfo.style.display = "flex";
}

closeBtn.onclick = function(){
    gameInfo.style.display = "none";
    if (checkBox.hasAttribute('checked')) {
        localStorage.setItem("firstTime","done");
    }
};


const container = document.querySelector('.container');
const btn = document.getElementById('btn');
const clickCountResult = document.getElementById('click-count');
const timerResult = document.getElementById('timer');
const clickSpeedResult = document.getElementById('click-speed');

const difficultyContainer = document.querySelector('.difficulty-container');
const resultContainer = document.querySelector('.result-container');
const alertText = document.getElementById('alertText');
const resultScore = document.getElementById('scoreP');
const resultTime = document.getElementById('timeSurvived');
const resultSpeed = document.getElementById('resultSpeed');
const restartBtn = document.querySelector('.restart-btn');
const easy = document.getElementById('easy');
const normal = document.getElementById('normal');
const hard = document.getElementById('hard');

let timesClicked = 0;
let time = 0;
let clickSpeed;
let timeStart = false;
let timerInterval;
let speedInterval;
let minSpeed = 1;

easy.onclick = function () {
    setInterval(function () {
        minSpeed += 0.005;
    }, 500);
    difficultyContainer.remove();
};

normal.onclick = function () {
    setInterval(function () {
        minSpeed += 0.01;
    }, 500);
    difficultyContainer.remove();
};

hard.onclick = function () {
    setInterval(function () {
        minSpeed += 0.03;
    }, 500);
    difficultyContainer.remove();
};

function changeLocation() {

    let randomPosX = Math.random() * 85;
    let randomPosY = Math.random() * 85;
    btn.style.left = randomPosX + "%";
    btn.style.top = randomPosY + "%";

    if (!timeStart) {

        timerInterval = setInterval(function () {
            timerResult.innerHTML = time.toFixed(0);
            time += 0.01;
        }, 10)

        speedInterval = setInterval(function () {
            clickSpeed = timesClicked / time;
            clickSpeed = clickSpeed.toFixed(2);
            clickSpeedResult.innerHTML = clickSpeed;

            if (clickSpeed < minSpeed) {
                clearInterval(timerInterval);
                clearInterval(speedInterval);
                container.remove();
                resultContainer.style.display = "flex";
                alertText.innerText = "Out of time!"
                resultScore.innerText = "Score: " + timesClicked;
                resultTime.innerText = time.toFixed(2);
                resultSpeed.innerText = "Speed: " + clickSpeed + " clicks/sec";
                restartBtn.addEventListener("click", function () {
                    window.location.reload();
                });
            }

        }, 10)

        container.addEventListener("click", function (evt) {
            if (evt.target != btn) {
                clearInterval(timerInterval);
                clearInterval(speedInterval);
                container.remove();
                resultContainer.style.display = "flex";
                alertText.innerText = "You misclicked!"
                resultScore.innerText = "Score: " + timesClicked;
                resultTime.innerText = time.toFixed(2);
                resultSpeed.innerText = "Speed: " + clickSpeed + " clicks/sec";
                restartBtn.addEventListener("click", function () {
                    window.location.reload();
                });
            }
        });

        timeStart = true;
    }

    timesClicked++;
    clickCountResult.innerHTML = timesClicked;

}

btn.addEventListener('click', changeLocation);
