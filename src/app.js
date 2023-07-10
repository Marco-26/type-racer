//TODO: Botão de reset na parte de escrever, caso queira um novo texto
//TODO: Barra para escolher quanto tempo para escrever
//TODO: Adicionar um modo, com tempo e outro modo com montante de palavras


let words = [];
let timerStarted = false;
let currentWordIndex = 0;
let wordsTyped = 0;
let currentLetterIndex = 0;
let time = 30;
let timeLeft = time;
let intervalId;

let gamemode = 'timer'; // timer | words

let minLength = 100;
let maxLength = 120;
const API = `http://api.quotable.io/random?minLength=${minLength}&&maxLength=${maxLength}`;

const inputArea = document.getElementById('inputbox');
const progressStatus = document.getElementById('progress');
const gameScreen = document.querySelector('.game');
const endGameScreen = document.querySelector('.end');
const optionsBar = document.querySelector('.options');
const wordGamemodeButton = document.querySelector('.wordGamemode');
const timerGamemodeButton = document.querySelector('.timerGamemode');

inputArea.addEventListener('input', checkInput);

wordGamemodeButton.addEventListener('click', () =>{
  gamemode = 'word';
  render();
});

timerGamemodeButton.addEventListener('click', () => {
  gamemode = 'timer';
  render();
});


gameScreen.style.display = 'block';
endGameScreen.style.display = 'none';

async function getRandomQuote() {
  return fetch(API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function getFormattedWords(){
  let wordsArr = [];
  let quote = await getRandomQuote();
  wordsArr = quote.split(' ');
  wordsArr = wordsArr.map((word, index) =>{
    if(index == wordsArr.length - 1){
      return word;
    }
    else{
      return word + ' ';
    }
  });
  return wordsArr;
}

async function render() {
  words = await getFormattedWords();
  wordsLeft = words.length;

  let wordShowcaseContainer = document.getElementById('word-showcase');
  wordShowcaseContainer.innerHTML = '';
  for (let i = 0; i < words.length; i++) {
    const wordDiv = document.createElement('div');
    wordDiv.setAttribute('class', 'word');
    for (let k = 0; k < words[i].length; k++) {
      const letter = document.createElement('span');
      letter.textContent = words[i].charAt(k);
      wordDiv.append(letter);
    }
    wordShowcaseContainer.append(wordDiv);
  }
}

render();

function checkInput(event) {
  optionsBar.style.display = 'none';

  const lastLetter = getLastLetter(event);

  let showcaseWordContainer = document.getElementById('word-showcase').children;

  let showcaseWord = showcaseWordContainer[currentWordIndex];
  let showcaseLetter = showcaseWord.children;
  let wordToGuess = words[currentWordIndex];
  let input = document.getElementById('inputbox');
  let curWord = input.value;
  let totalWords = words.length;
  
  updateStatusBar(totalWords);

  //TODO: CTRL - BACKSPACE, faz nada

  if (
    event.data == null &&
    event.inputType == 'deleteContentBackward' &&
    currentLetterIndex > 0
  ) {
    if (curWord.length >= wordToGuess.length) {
      return;
    }
    currentLetterIndex--;
    showcaseLetter[currentLetterIndex].style.color = '#5C5E62';
    return;
  }

  if (lastLetter == wordToGuess.charAt(currentLetterIndex)) {
    showcaseLetter[currentLetterIndex].style.color = '#D1D0C5';
    currentLetterIndex++;
  } else {
    if (currentLetterIndex >= wordToGuess.length) {
      return;
    }
    showcaseLetter[currentLetterIndex].style.color = '#CA4754';
    currentLetterIndex++;
  }

  if (curWord == wordToGuess) {
    wordsTyped++;
    wordsLeft--;
   
    if(wordsTyped == totalWords || event.inputType == 'insertText' && event.data === ' '){
      input.value = '';
      currentWordIndex++;
      currentLetterIndex = 0;
      curWord = null;
    }
    if (currentWordIndex >= totalWords) {
      endGame();
    }
  }
}

function getLastLetter(event) {
  const input = event.target.value;
  return input[input.length - 1];
}

async function endGame() {
  stopInterval(intervalId);
  optionsBar.style.display = 'block';
  timerStarted = false;
  timeLeft = time;
  progressStatus.innerText = timeLeft;
  await import('./endgame.js');
  let wpm = (wordsTyped / (time-timeLeft/60))*60 ;
  console.log(wpm);
  localStorage.setItem('wpm', wpm);
  localStorage.setItem('wordsTyped', wordsTyped);
  gameScreen.style.display = 'none';
  endGameScreen.style.display = 'block';
}

function startInterval() {
  timerStarted = true;
  progressStatus.innerText = timeLeft;
  intervalId = setInterval(startTimer, 1000); // Starts the interval
}

function stopInterval() {
  clearInterval(intervalId); // Clears the interval
}

function startTimer() {
  timeLeft--;
  progressStatus.innerText = timeLeft;

  if (timeLeft <= 0) {
    progressStatus.innerText = 0;
    endGame();
  }
}

function updateStatusBar(totalWords){
  switch(gamemode){
  case 'timer':
    startInterval();
    break;
  case 'word':
    progressStatus.innerText = `${wordsTyped}/${totalWords}`;
    break;
  }
}
