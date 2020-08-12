let lettersOfSelectedWord = [];
let wrongLetters = [];
let selectedWord = "";
let usPoints = 0;
const wrongLettersDiv = document.getElementById("wrongLetters");
const wordContainer = document.getElementById("wordContainer");
const usersPoints = document.getElementById("usersPoints");
const message = document.getElementById("message");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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
  let usersChoisOfLetter = document.getElementById("char").value;
  if (usersChoisOfLetter === "") {
    alert("Välj ett bockstav");
  } else {
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
    if (wrongLetters.length > 0 && wrongLetters.length <= 10) {
      wrongLetters.map((letter) => {
        let p = document.createElement("p");
        let t = document.createTextNode(letter);
        p.appendChild(t);
        wrongLettersDiv.appendChild(p);
        drowFigur(wrongLetters);
      });
    } else {
      gameOver();
    }
  }
}
function reloadGame() {
  location.reload();
}
function gameOver() {
  document.getElementById("letterInput").style.display = "none";
  document.getElementById("reload").style.display = "block";
}

function drowFigur(wrongLetters) {
  if (wrongLetters.length !== 0) {
    for (let i = 0; i < wrongLetters.length; i++) {
      drow(i);
    }
  }
}
function drow(i) {
  switch (i) {
    case 0:
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(150, 350);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(100, 350);
      ctx.lineTo(100, 50);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(200, 50);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(200, 50);
      ctx.lineTo(200, 80);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.arc(200, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.lineTo(200, 200);
      ctx.stroke();
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.lineTo(150, 160);
      ctx.stroke();
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.lineTo(250, 160);
      ctx.stroke();
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(180, 270);
      ctx.stroke();
      break;
    case 9:
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(220, 270);
      ctx.stroke();
      message.innerHTML = "Spelet är slut!";
      gameOver();
      break;
  }
}
