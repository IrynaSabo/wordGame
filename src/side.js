//variables
let lettersOfSelectedWord = [];
let wrongLetters = [];
let selectedWord = "";
const wrongLettersDiv = document.getElementById("wrongLetters");
const wordContainer = document.getElementById("wordContainer");
const usersPoints = document.getElementById("usersPoints");
let correctAnswer = [];
const message = document.getElementById("message");
let usPoints = 0;
let roundsMax = 10;
let rounds = 0;

const words = [
  "äpple",
  "säsong",
  "fönster",
  "väder",
  "leverans",
  "paraply",
  "teckning",
  "sommar",
  "potatis",
  "bulle",
];

function Start() {
  if (selectedWord !== "") {
    alert("Det finns redan ett ord att gisa!");
  } else {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    lettersOfSelectedWord = selectedWord.split("");
    console.log(lettersOfSelectedWord);
    createDivForLetters(lettersOfSelectedWord);
    document.getElementById("input").style.display = "block";
    document.getElementById("info").style.display = "none";
  }
}
function createDivForLetters(array) {
  let divForLetter = ``;
  array.forEach((char) => {
    divForLetter += `<div class="char">?</div>`;
  });
  wordContainer.insertAdjacentHTML("beforeend", divForLetter);
}
function Game() {
  message.innerHTML = "";
  if (rounds === roundsMax) {
    message.innerHTML = "Spelet är slut!";
    gameOver();
  } else {
    const usersChoisOfLetter = document.getElementById("char").value;
    rounds += 1;
    let charCollection = document.querySelectorAll(".char");
    let indexes = lettersOfSelectedWord.reduce(function (a, e, i) {
      if (e === usersChoisOfLetter) a.push(i);
      return a;
    }, []);
    console.log(indexes.length);
    matchLetters(charCollection, indexes, usersChoisOfLetter);
    checkTheAnswer(indexes, usersChoisOfLetter);
    document.getElementById("char").value = "";
  }
}

function matchLetters(divs, indexes, letter) {
  if (indexes.length !== 0) {
    for (let i = 0; i < divs.length; i++) {
      for (let j = 0; j < indexes.length; j++) {
        if (indexes[j] === i) {
          divs[i].textContent = letter;
        }
      }
    }
  }
}
function randomCongratulation() {
  const array = ["Bravo!", "Bra jobbat!", "Super bra!", "Perfect!"];
  selectedWord = array[Math.floor(Math.random() * array.length)];
  return selectedWord;
}
function checkTheAnswer(indexes, letter) {
  if (indexes.length !== 0) {
    usPoints += indexes.length;
    usersPoints.innerHTML = usPoints;
    message.innerHTML = randomCongratulation();
    console.log(usPoints);
    if (usPoints === lettersOfSelectedWord.length) {
      message.innerHTML = "Grattis du vann spelet!";
      gameOver();
    }
  } else {
    wrongLettersDiv.innerHTML = "";
    wrongLetters.push(letter);
    wrongLetters.map((letter) => {
      let p = document.createElement("p");
      let t = document.createTextNode(letter);
      p.appendChild(t);
      wrongLettersDiv.appendChild(p);
    });
  }
}
function reloadGame() {
  location.reload();
}
function gameOver() {
  document.getElementById("letterInput").style.display = "none";
  document.getElementById("reload").style.display = "block";
}
