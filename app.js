words = []
const numberOfSetences = 2;
const API = 'http://api.quotable.io/random'

function getRandomQuote() {
  return fetch(API)
    .then(response => response.json())
    .then(data => data.content)
}

async function getData(){
  const quote = await getRandomQuote();
  words = quote.split(' ');
  showWords(words);
  // let wordShowcaseContainer = document.getElementById("word-showcase");
  // wordShowcaseContainer.innerHTML = '';
  // words.forEach(word => {
  //     const span = document.createElement("span");
  //     // span.setAttribute("class","word");
  //     span.innerText = char;
  //     wordShowcaseContainer.appendChild(span);
  // });
}

getData();

let currentWordIndex = 0;
let currentLetterIndex = 0;

let inputArea = document.getElementById("inputbox");
inputArea.addEventListener("input", checkInput);

function showWords(words){
  let wordShowcaseContainer = document.getElementById("word-showcase");
  wordShowcaseContainer.innerHTML = '';

  for (let i = 0; i < words.length; i++) {
    const wordDiv = document.createElement("div");
    wordDiv.setAttribute("class","word");
    for (let k = 0; k < words[i].length; k++) {
      const letter = document.createElement("span");
      letter.textContent = words[i].charAt(k);
      wordDiv.append(letter);
    }
    wordShowcaseContainer.append(wordDiv)

  // words.split('').forEach(char => {
  //     const span = document.createElement("span");
  //     span.innerText = char;
  //     wordShowcaseContainer.appendChild(span);
  //     console.log("Hello")
  // });
  }
}

function checkInput(event){
  const lastLetter = getLastLetter(event);

  let showcaseWordContainer = document.getElementById("word-showcase").children;

  let showcaseWord = showcaseWordContainer[currentWordIndex];
  let showcaseLetter = showcaseWord.children;
  let wordToGuess = words[currentWordIndex];
  let input = document.getElementById("inputbox");;
  let curWord = input.value;

  //TODO: CTRL - BACKSPACE, faz nada

  if(event.data == null && event.inputType == "deleteContentBackward" && currentLetterIndex > 0){
    if(curWord.length >= wordToGuess.length){
      return;
    }
    currentLetterIndex--;
    showcaseLetter[currentLetterIndex].style.color = "#5C5E62";
    return;
  }

  if(lastLetter == wordToGuess.charAt(currentLetterIndex)){
    showcaseLetter[currentLetterIndex].style.color = "#D1D0C5";
    currentLetterIndex++;
  }
  else{
    if(currentLetterIndex >= wordToGuess.length){
      return;
    }
    showcaseLetter[currentLetterIndex].style.color = "#CA4754";
    currentLetterIndex++;
  }

  if(curWord == wordToGuess){
    input.value = "";
    currentWordIndex++;
    currentLetterIndex = 0;
    curWord = null;
    checkEndGame();
  }
}

function getLastLetter(event){
  const input = event.target.value;
  return input[input.length - 1];
}

function checkEndGame(){
  if(currentWordIndex >= WORDS.length){
    
  }
}