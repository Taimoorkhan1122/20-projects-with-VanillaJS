const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-again");
const popUpContainer = document.getElementById("popup-container");
const notification = document.getElementById("notification");
const finalMsg = document.getElementById("final-message");
const figureEl = document.querySelectorAll(".fig-part");

const words = ["education", "character", "union", "display", "october"];

let selectedWords = words[Math.floor(Math.random() * words.length)];
console.log(selectedWords);

const correctLetters = [];
const wrongLetters = [];

function updateWord() {
  wordEl.innerHTML = `
    ${selectedWords
      .split("")
      .map(
        (letter) => `
            <span class='letter'>
            ${correctLetters.includes(letter) ? letter : ""}
            </span>
            `
      )
      .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWords) {
    finalMsg.innerText = "Congratulations! vivtory!! 😃 ";
    popUpContainer.style.display = "flex";
  }
}

// Display Wrong letters
function updateWrongletter() {
  wrongLetterEl.childNodes.length > 0
    ? `${(wrongLetterEl.style.display = "block")}`
    : "";

  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong Letter</p>` : ""}
    ${wrongLetters.map(
      (wrongletter) =>
        `${!correctLetters.includes(wrongletter) ? wrongletter : ""}`
    )}
    `;

  figureEl.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureEl.length) {
    finalMsg.innerText = "Unfortunately You lost!😕";
    popUpContainer.style.display = "flex";
  }
}

// Show Notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

// Event Listeners
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWords.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        console.log("correct", letter);
        updateWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongletter();
        console.log("wrong", letter);
      } else {
        showNotification();
      }
    }
  }
});

// Restart Game
playAgain.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  updateWord();
  updateWrongletter();

  popUpContainer.style.display = "none";
  wrongLetterEl.style.display = "none";
});

updateWord();
updateWrongletter();
