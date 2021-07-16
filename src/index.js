const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const refs = {
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
    body: document.querySelector('body'),
};

let timerId = null;

refs.startBtn.addEventListener("click", () => colorSwitch(colors));
refs.stopBtn.addEventListener('click', colorSwitcherTurnOff);

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function colorSwitch(colors) {
  timerId = setInterval(() => {
    let randomColorIndex = randomIntegerFromInterval(0, colors.length);
    refs.body.style.backgroundColor = colors[randomColorIndex];
  }, 1000);
  refs.startBtn.setAttribute("disabled", true);
};

function colorSwitcherTurnOff() {
  clearInterval(timerId);
  refs.body.style.backgroundColor = 'white';
  refs.startBtn.removeAttribute("disabled");
};





