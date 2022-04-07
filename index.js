const cardContainer = document.querySelector(".card-container");
const form = document.querySelector("form");
const searchBar = document.querySelector("#search-bar");

const FOOD_DATABASE_APP_KEY = "11c0f84fd59d4b05892c55b414b7e106";
const FOOD_API = `https://api.spoonacular.com/recipes/random?apiKey=${FOOD_DATABASE_APP_KEY}&number=100`;
let searchValue = "";
const pathname = window.location.pathname;

const fetchApi = async (url) => {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
};

const clearPreviousCard = () => {
  cardContainer.innerHTML = "";
};

const createCardElement = async (cardData) => {
  cardData.forEach((data) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
            <div class="bg" style="background-image: url(${data.image})"></div>
            <div class="external-link-container">
              <a target="_blank" href="${
                data.sourceUrl ? data.sourceUrl : data.link
              }" class="article-type"> RECIPE </a>
              <button class="btn-fav"> Add to favourites </button>
            </div>
            <h3 class="recipe-name"> ${
              data.title ? data.title : data.name
            } </h3>
            <p class="recipe-explanation">${
              data.summary ? data.summary : data.content
            } </p>
        `;
    cardContainer.appendChild(cardElement);
  });
};

const displayMeals = async () => {
  const foodList = await fetchApi(FOOD_API);
  createCardElement(foodList.recipes);
};

const searchMeals = async (query) => {
  const SEARCH_FOOD_API = `https://api.spoonacular.com/food/search?apiKey=${FOOD_DATABASE_APP_KEY}&query=${query}&number=100`;
  const results = await fetchApi(SEARCH_FOOD_API);
  const recipeResults = results.searchResults[0].results;
  clearPreviousCard();
  createCardElement(recipeResults);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMeals(searchValue);
});

searchBar.addEventListener("input", (event) => {
  searchValue = event.target.value;
});

// Landing page setup
switch (pathname) {
  case "/":
    displayMeals();
    break;
  case "/favourite.html":
    console.log("Fav");
}

// Implmenting favourite page
const FAVOURITES = [];

const SetLocalStorage = function (data) {
  localStorage.setItem("favourites", JSON.stringify(data));
};

const GetLocalStorage = function () {
  const favouriteString = localStorage.getItem("favourites");
  return JSON.parse(favouriteString);
};

setTimeout(() => {
  const favBtns = document.getElementsByClassName("btn-fav");
  [...favBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
      FAVOURITES.push(event.target.parentNode.parentNode);
      SetLocalStorage(FAVOURITES);
      console.log(FAVOURITES);
    });
  });
}, 5000);
