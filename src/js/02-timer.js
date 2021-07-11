import Swal from 'sweetalert2';
import '../sass/main.scss';

const refs = {
  inputRef: document.querySelector('#date-selector'),
  startCountdownBtnRef: document.querySelector('[data-start]'),
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

let time = null;
let deadlineObj = null;

refs.startCountdownBtnRef.disabled = true;

class Timer {
  getDeadline(e) {
    const currentTime = Date.now();
    const parsedTime = Date.parse(e.target.value);

    time = parsedTime - currentTime;

    if (time > 0) {
      refs.startCountdownBtnRef.disabled = false;
    }

    if (time < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please choose a date in the future!',
      });
    }
  }
}

function startTimer() {
  let deadline = time;

  const intervalId = setInterval(() => {
    if (deadline > 999) {
      deadline -= 1000;

      deadlineObj = convertMs(deadline);

      refs.daysRef.textContent = deadlineObj.days;
      refs.hoursRef.textContent = deadlineObj.hours;
      refs.minutesRef.textContent = deadlineObj.minutes;
      refs.secondsRef.textContent = deadlineObj.seconds;
    }

    if (deadline < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

const timer = new Timer();

refs.inputRef.addEventListener('change', timer.getDeadline);
refs.startCountdownBtnRef.addEventListener('click', () => {
  startTimer();
  refs.inputRef.disabled = true;
  refs.startCountdownBtnRef.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

  function pad(value) {
    return String(value).padStart(2, '0');
  }
}
