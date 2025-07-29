let [seconds, minutes, hours] = [0,0,0];
let TimerDisplay = document.getElementById('TimerDisplay');
let timer = null;
let btn = document.getElementById("togglebtn");
let frame = document.querySelector('.frame');
//frame.style.display = 'none';
let laps = [];
let [s,m,h] = [0,0,0];
function Displaytimer()
{
    seconds++;
    if(seconds == 60)
    {
        seconds = 0;
        minutes++;
        if(minutes == 60)
        {
            minutes = 0;
            hours++;
        }
    }
    s = seconds < 10 ? "0"+seconds:seconds;
    m = minutes < 10 ? "0"+minutes:minutes;
    h = hours < 10 ? "0"+hours:hours;
    TimerDisplay.innerHTML = h + ":" + m + ":" + s;
}

function startTimer()
{
    if(timer != null)
    {
        clearInterval(timer);
    }
    timer = setInterval(Displaytimer,1000);
}
function stopTimer()
{
    clearInterval(timer);
}
function resetTimer()
{
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    TimerDisplay.innerHTML = "00:00:00";
    icon.classList.remove('bx-pause-circle');
    icon.classList.add('bx-play-circle');
}

//Laps
let currentId = 1;
let lap;
function addLaps(){
    let newLap = {
        id: currentId++,
        s: s,
        h: h,
        m: m
    };
    laps.push(newLap);
    for(let j=0; j<laps.length; j++)
    {
        lap = laps[j];
        
    }
    showLaps(lap);
}
function showLaps(lap){
    let lapDisplay = document.createElement('label');
    frame.appendChild(lapDisplay);
    
    console.log(lap);
    lapDisplay.innerHTML = lap.h + ":" + lap.m + ":" + lap.s;
}
//END OF LAPS
btn.addEventListener('click',()=>{
    if(icon.classList.contains('bx-play-circle'))
    {
        icon.classList.remove('bx-play-circle');
        icon.classList.add('bx-pause-circle');
        startTimer();
    }else if(icon.classList.contains('bx-pause-circle'))
        {
            icon.classList.remove('bx-pause-circle');
            icon.classList.add('bx-play-circle');
            stopTimer();
    }
});