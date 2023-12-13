// GENERAL TODOS
// - right now users cant see what the selected country was, it should display somewhere on the page

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

// while building the app, we are going to use window.onload. once its done it will be moved down to the popup button
countryGuess.value = "";
let selectedCountry;
let countryName;
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
  // requestCountries();
});

// API CALL AND INSERTION
async function requestCountries() {
  let countries = [];
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const results = await response.json();
    countries.push(...results);
    console.log(countries);
    const generatedNumber = Math.round(Math.random() * 250) + 1;
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
    hintButton.remove();
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
    alert("Guess is right!");
  } else {
    alert("GUESS IS WRONG");
  }
});
