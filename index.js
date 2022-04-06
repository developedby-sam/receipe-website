const cardContainer = document.querySelector(".card-container");
const form = document.querySelector("form");
const searchBar = document.querySelector("#search-bar");

const FOOD_DATABASE_APP_KEY = "120d8fbb220a451e91c2b70d158fbfa0";
const FOOD_API = `https://api.spoonacular.com/recipes/random?apiKey=${FOOD_DATABASE_APP_KEY}&number=10`;
let searchValue = "";

const fetchApi = async (url) => {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
};

const clearPreviousCard = () => {
  cardContainer.innerHTML = "";
};

const createCardElement = (cardData) => {
  cardData.forEach((data) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
            <div class="bg" style="background-image: url(${data.image})"></div>
            <p class="article-type"> RECIPE </p>
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
  console.log(recipeResults);
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

displayMeals();
