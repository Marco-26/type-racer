WORDS = []
const numberOfSetences = 2;
const apiUrl = `https://baconipsum.com/api/?type=all-meat&paras=1&sentences=${numberOfSetences}&type=meat-and-filler`;

 fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    WORDS = data[0].split(' ');
    showWords()
  })
  .catch(error => console.error(error))


let currentWordIndex = 0;
let currentLetterIndex = 0;

let inputArea = document.getElementById("inputbox");
inputArea.addEventListener("input", checkInput);

function showWords(){ 
  let wordShowcaseContainer = document.getElementById("word-showcase");
  for (let i = 0; i < WORDS.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","word");
    for (let k = 0; k < WORDS[i].length; k++) {
      const newParagraph = document.createElement("p");
      newParagraph.textContent = WORDS[i].charAt(k);
      newDiv.append(newParagraph);
    }
    wordShowcaseContainer.append(newDiv)
  }
}

showWords();

function checkInput(event){
  const lastLetter = getLastLetter(event);

  let showcaseWordContainer = document.getElementById("word-showcase").children;
  let showcaseWord = showcaseWordContainer[currentWordIndex];
  let showcaseLetter = showcaseWord.children;
  let wordToGuess = WORDS[currentWordIndex];
  let input = document.getElementById("inputbox");
  let curWord = input.value;

  //TODO: CTRL - BACKSPACE, faz nada

  if(event.data == null && event.inputType == "deleteContentBackward" && currentLetterIndex > 0){
    if(curWord.length >= wordToGuess.length){
      return;
    }
    currentLetterIndex--;
    showcaseLetter[currentLetterIndex].style.color = "black";
    return;
  }

  if(lastLetter == wordToGuess.charAt(currentLetterIndex)){
    showcaseLetter[currentLetterIndex].style.color = "green";
    currentLetterIndex++;
  }
  else{
    if(currentLetterIndex >= wordToGuess.length){
      return;
    }
    showcaseLetter[currentLetterIndex].style.color = "red";
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