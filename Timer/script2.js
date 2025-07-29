//BUGGY

class TimerLapManager {
    constructor(timerDisplayId, toggleButtonId, frameClass) {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timer = null;
        this.currentId = 1;
        this.laps = [];

        this.timerDisplay = document.getElementById(timerDisplayId);
        this.toggleButton = document.getElementById(toggleButtonId);
        this.frame = document.querySelector(frameClass);
        this.icon = this.toggleButton.querySelector('i'); // Adjust based on your HTML

        // Initialize event listeners
        this.toggleButton.addEventListener('click', () => this.toggleTimer());
    }

    displayTimer() {
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes === 60) {
                this.minutes = 0;
                this.hours++;
            }
        }

        const s = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        const m = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        const h = this.hours < 10 ? `0${this.hours}` : this.hours;

        this.timerDisplay.innerHTML = `${h}:${m}:${s}`;
    }

    startTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => this.displayTimer(), 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timerDisplay.innerHTML = "00:00:00";
        this.icon.classList.remove('bx-pause-circle');
        this.icon.classList.add('bx-play-circle');
    }

    addLap() {
        const newLap = {
            id: this.currentId++,
            s: this.seconds < 10 ? `0${this.seconds}` : this.seconds,
            m: this.minutes < 10 ? `0${this.minutes}` : this.minutes,
            h: this.hours < 10 ? `0${this.hours}` : this.hours
        };
        this.laps.push(newLap);
        this.showLaps();
    }

    showLaps() {
        // Clear previous lap displays
        this.frame.innerHTML = '';

        // Create and append lap display elements
        this.laps.forEach(lap => {
            const lapDisplay = document.createElement('label');
            lapDisplay.innerHTML = `${lap.h}:${lap.m}:${lap.s}`;
            this.frame.appendChild(lapDisplay);
        });
    }

    toggleTimer() {
        if (this.icon.classList.contains('bx-play-circle')) {
            this.icon.classList.remove('bx-play-circle');
            this.icon.classList.add('bx-pause-circle');
            this.startTimer();
        } else if (this.icon.classList.contains('bx-pause-circle')) {
            this.icon.classList.remove('bx-pause-circle');
            this.icon.classList.add('bx-play-circle');
            this.stopTimer();
        }

        // Optionally, clear laps and reset
        this.laps = [];
        this.currentId = 1;
        this.showLaps();
    }
}

// Example usage
const timerLapManager = new TimerLapManager('TimerDisplay', 'togglebtn', '.frame');
