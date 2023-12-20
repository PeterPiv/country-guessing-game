// GENERAL TODOS
// have a small score system. for every right guess the player should get like 1 point. or maybe it could be a tiered point system. the more obscure a country is the more points you get.
// refine country display
// "auto-reload" game after a guess

// SELECTORS
const popUp = document.querySelector(".pop-up");
const popUpBtn = document.querySelector(".popup-button");
const form = document.querySelector("form");
const countryGuess = document.querySelector("#country-guess");
const game = document.querySelector(".game");
const hintButtons = document.querySelectorAll(".hint > button");
const hiddenText = document.querySelectorAll(".text-hidden");
const apiInserts = document.querySelectorAll(".api-insert");
const guess = document.querySelector(".guess");
const guessName = document.querySelector(".guess-name");
let pointsDisplay = document.querySelector(".points > span");

countryGuess.value = "";
let selectedCountry;
let countryName;
let points = 0;
requestCountries();

// POPUP WINDOW HANDLING
popUpBtn.addEventListener("click", () => {
  if (!popUp.classList.contains("rollup")) {
    popUp.classList.add("rollup");
    for (const child of popUp.children) {
      child.classList.add("hidden");
    }
    game.classList.remove("hidden");
  }
  requestCountries();
});

// API CALL AND INSERTION
async function requestCountries() {
  let countries = [];
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const results = await response.json();
    countries.push(...results);
    console.log(countries);
    const generatedNumber = Math.floor(Math.random() * 250);
    // VARIABLES
    selectedCountry = countries[generatedNumber];
    apiInserts[0].textContent = selectedCountry.population;
    apiInserts[1].textContent = selectedCountry.subregion;
    apiInserts[2].textContent = selectedCountry.capital[0];
    countryName = selectedCountry.name.common;
    console.log(countryName);
  } catch (error) {
    console.log(error);
  }
}

// HINT BUTTON HANDLING
hintButtons.forEach((hintButton) => {
  hintButton.addEventListener("click", () => {
    const targetHintId = hintButton.dataset.hintTarget;
    const targetHint = document.querySelector(`#${targetHintId}`);
    hintButton.classList.toggle("hide");
    targetHint.classList.remove("text-hidden");
  });
});

// FORM HANDLING
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(`This is the guess ${countryGuess.value}`);
  guessName.textContent = countryName;
  guess.classList.remove("hidden");

  if (countryGuess.value.toLowerCase() === countryName.toLowerCase()) {
    guessName.classList.add("correct");
    guessName.classList.remove("wrong");
    points += 1;
  }
  if (countryGuess.value.toLowerCase() !== countryName.toLowerCase()) {
    guessName.classList.add("wrong");
    guessName.classList.remove("correct");
    points -= 1;
  }
  pointsDisplay.textContent = points;
  guessName.classList.add("bold");

  setTimeout(() => {
    resetGame();
  }, 1500);
});

// resets game after a guess
function resetGame() {
  hintButtons.forEach((hintButton) => {});
  guessName.classList.remove("correct", "wrong");
  guessName.textContent = "-";
  countryGuess.value = "";
  requestCountries();
}
