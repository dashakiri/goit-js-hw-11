const { default: Swal } = require("sweetalert2");

const refs = {
    input: document.getElementById('date-selector'),
    startBtn: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    timeValue: document.querySelector('.value'),
    day: document.querySelector('[data-days]'),
    hour: document.querySelector('[data-hours]'),
    minute: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);

class Timer {
  constructor(targetDate) {
    this.targetDate = targetDate;
    this.start();
  }

  start() {
    let currentDate = Date.now();

    if (this.targetDate < currentDate) {
      Swal.fire("Please choose a date in the future");
    } else {
      setInterval(() => {
      currentDate = Date.now();
      let timeCountdown = this.targetDate - currentDate;
        this.timerUpdate(convertMs(timeCountdown));
        console.log(convertMs(timeCountdown))
    }, 1000);}  
    }
  
    timerUpdate({days, hours, minutes, seconds}) {
      refs.day.innerHTML = `${days}`;
      refs.hour.innerHTML = `${hours}`;
      refs.minute.innerHTML = `${minutes}`;
      refs.seconds.innerHTML = `${seconds}`;
    }

};

function oninputChange() {
  refs.startBtn.removeAttribute('disabled');
  refs.startBtn.addEventListener('click', onStartButtonClick);
};

function onStartButtonClick() {
  const inputDate = Date.parse(refs.input.value);
  const newTimer = new Timer(inputDate);
  refs.startBtn.setAttribute('disabled', true);
  refs.input.value = '';

}
  
refs.input.addEventListener('change', oninputChange);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}

function pad(value) {
    return String(value).padStart(2, '0');
}
