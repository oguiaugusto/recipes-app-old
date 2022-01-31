// base url para api da página de comida.
const FOODS_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOODS_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOODS_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

// base url para api da página de bebidas
const DRINKS_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINKS_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const baseFetch = (url) => (
  fetch(url)
    .then((r) => r
      .json()
      .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))))

);

// fetch para api de comidas
const fetchFoodIngredient = (ingredient) => {
  baseFetch(`${FOODS_INGREDIENT_URL}${ingredient}`);
};
const fetchFoodName = (name) => baseFetch(`${FOODS_NAME_URL}${name}`);
const fetchFoodLetter = (letter) => baseFetch(`${FOODS_LETTER_URL}${letter}`);

// fetch para api de bebidas
const fetchDrinkIngredient = (ingredient) => {
  baseFetch(`${DRINKS_INGREDIENT_URL}${ingredient}`);
};
const fetchDrinkName = (name) => baseFetch(`${DRINKS_NAME_URL}${name}`);
const fetchDrinkLetter = (letter) => baseFetch(`${DRINKS_LETTER_URL}${letter}`);

export { fetchFoodIngredient, fetchFoodName, fetchFoodLetter,
  fetchDrinkIngredient, fetchDrinkName, fetchDrinkLetter };
