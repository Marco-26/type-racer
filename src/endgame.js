const wpmStr = localStorage.getItem('wpm');
const wordsTyped = localStorage.getItem('wordsTyped');

const wpmFormatted = parseInt(wpmStr);

const wpmNumberContainer = document.querySelector('.wpm-number');
const charsTypedContainer = document.querySelector('.chars-typed');
const restartButton = document.querySelector('.restart-button');

const gameScreen = document.querySelector('.game');
const endGameScreen = document.querySelector('.end');

wpmNumberContainer.innerText = wpmFormatted;
charsTypedContainer.innerText = wordsTyped;

restartButton.addEventListener('click', () =>{
  console.log('Clicked');
  endGame();
});

async function endGame() {
  //TODO: reset timer
  await import('./app.js');
  gameScreen.style.display = 'block';
  endGameScreen.style.display = 'none';
}