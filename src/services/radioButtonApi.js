// base url para api da página de comida.
const FOODS_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOODS_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOODS_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

// base url para api da página de bebidas
const DRINKS_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINKS_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const INGREDIENTS_URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const INGREDIENTS_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const AREAS_URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const AREA_URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const baseFetch = (url) => (
  fetch(url)
    .then((r) => r
      .json()
      .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))))
);

// fetch para api de comidas
const fetchFoodIngredient = (ingredient) => (
  baseFetch(`${FOODS_INGREDIENT_URL}${ingredient}`)
);

// fetch para api de bebidas
const fetchDrinkIngredient = (ingredient) => (
  baseFetch(`${DRINKS_INGREDIENT_URL}${ingredient}`)
);

const fetchFoodArea = (countrie) => (
  baseFetch(`${AREA_URL_FOODS}${countrie}`)
);

const fetchFoodAreas = () => baseFetch(`${AREAS_URL_FOODS}`);

// fetch para trazer um array de ingredients
const fetchFoodIngredients = () => baseFetch(`${FOODS_INGREDIENT_URL}`);
const fetchDrinkIngredients = () => baseFetch(`${DRINKS_INGREDIENT_URL}`);

// Usado na tela de explorar por ingredients
const fetchIngredientFood = () => baseFetch(INGREDIENTS_URL_FOODS);
const fetchIngredientDrink = () => baseFetch(INGREDIENTS_URL_DRINKS);

const fetchFoodName = (name) => baseFetch(`${FOODS_NAME_URL}${name}`);
const fetchFoodLetter = (letter) => baseFetch(`${FOODS_LETTER_URL}${letter}`);

const fetchDrinkName = (name) => baseFetch(`${DRINKS_NAME_URL}${name}`);
const fetchDrinkLetter = (letter) => baseFetch(`${DRINKS_LETTER_URL}${letter}`);

export { fetchFoodIngredient, fetchFoodName, fetchFoodLetter,
  fetchDrinkIngredient, fetchDrinkName, fetchDrinkLetter,
  fetchFoodIngredients, fetchDrinkIngredients,
  fetchIngredientFood, fetchIngredientDrink, fetchFoodArea, fetchFoodAreas };
