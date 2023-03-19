const WORDS = [
  "hello",
  "world",
  "how",
  "are",
  "u"
]

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

  if(event.data == null && event.inputType == "deleteContentBackward"){
    currentLetterIndex--;
    showcaseLetter[currentLetterIndex].style.color = "black";
    return;
  }

  if(lastLetter == wordToGuess.charAt(currentLetterIndex)){
    showcaseLetter[currentLetterIndex].style.color = "green";
    currentLetterIndex++;
  }
  else{
    showcaseLetter[currentLetterIndex].style.color = "red";
    currentLetterIndex+=1;
  }

  if(curWord == wordToGuess){
    input.value = "";
    currentWordIndex++;
    currentLetterIndex = 0;
    curWord = null;
  }
}

function getLastLetter(event){
  const input = event.target.value;
  return input[input.length - 1];
}
