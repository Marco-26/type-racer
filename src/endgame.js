const wpmStr = localStorage.getItem('wpm');
const charsTyped = localStorage.getItem('charsTyped');

const wpmFormatted = parseInt(wpmStr);

const wpmNumberContainer = document.querySelector('.wpm-number');
const charsTypedContainer = document.querySelector('.chars-typed');

wpmNumberContainer.innerText = wpmFormatted;
charsTypedContainer.innerText = charsTyped;
