const btn = document.getElementById('btn');
const clickCountResult = document.getElementById('click-count');
const timerResult = document.getElementById('timer');
const clickSpeedResult = document.getElementById('click-speed');

let timesClicked = 0;
let time = 0;
let clickSpeed;
let timeStart = false;

function changeLocation() {

    let randomPosX = Math.random() * 85;
    let randomPosY = Math.random() * 85;
    btn.style.left = randomPosX + "%";
    btn.style.top = randomPosY + "%";

    if(!timeStart) {
        setInterval(function(){
            timerResult.innerHTML = time.toFixed(0);
            time += 0.01;
        }, 10)
        setInterval(function(){
            clickSpeed = timesClicked/time;
            clickSpeed = clickSpeed.toFixed(2);
            clickSpeedResult.innerHTML = clickSpeed;
        }, 10)
        timeStart = true;
    }

    timesClicked++;
    clickCountResult.innerHTML = timesClicked;
}

btn.addEventListener('click', changeLocation);