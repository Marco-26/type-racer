words = []
const numberOfSetences = 1;
const apiUrl = `https://baconipsum.com/api/?type=all-meat&paras=1&sentences=${numberOfSetences}&type=meat-and-filler`;

async function getData(){
  try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    words = data[0].split(' ');
    showWords(words);
  }
  catch(error){
    console.log(error);
  }
}

getData();

let currentWordIndex = 0;
let currentLetterIndex = 0;

let inputArea = document.getElementById("inputbox");
inputArea.addEventListener("input", checkInput);

function showWords(words){ 
  let wordShowcaseContainer = document.getElementById("word-showcase");
  for (let i = 0; i < words.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","word");
    for (let k = 0; k < words[i].length; k++) {
      const newParagraph = document.createElement("p");
      newParagraph.textContent = words[i].charAt(k);
      newDiv.append(newParagraph);
    }
    wordShowcaseContainer.append(newDiv)
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