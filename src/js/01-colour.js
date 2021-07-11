const refs = {
  bodyRef: document.querySelector('body'),
  startBtnRef: document.querySelector('button[data-start]'),
  stopBtnRef: document.querySelector('button[data-stop]'),
};

refs.startBtnRef.addEventListener('click', onStartBtnClick);
refs.stopBtnRef.addEventListener('click', onStopBtnClick);

let timerId = null;

function onStartBtnClick() {
  refs.startBtnRef.setAttribute('disabled', true);

  timerId = setInterval(
    () => (refs.bodyRef.style = `background-color: ${getRandomHexColor()};`),
    1000,
  );
}

function onStopBtnClick() {
  clearInterval(timerId);
  refs.startBtnRef.removeAttribute('disabled');

  refs.bodyRef.style.backgroundColor = '#ffffff';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
