const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const COCKTAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const COCKTAILS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MEALS_BY_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const COCKTAILS_BY_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const MEAL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const COCKTAIL_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const RANDOM_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const FOODS_BY_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOODS_BY_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOODS_BY_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const DRINKS_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINKS_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const MEALS_BY_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_BY_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const FOODS_AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FOODS_BY_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const baseFetch = (url) => (
  fetch(url)
    .then((r) => r
      .json()
      .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))))
);

const fetchMeals = () => baseFetch(MEALS_URL);
const fetchCocktails = () => baseFetch(COCKTAILS_URL);

const fetchMealsCategories = () => baseFetch(MEALS_CATEGORIES_URL);
const fetchCocktailsCategories = () => baseFetch(COCKTAILS_CATEGORIES_URL);

const fetchMealsByCategory = (category) => (
  baseFetch(`${MEALS_BY_CATEGORY_URL}${category}`)
);
const fetchCocktailsByCategory = (category) => (
  baseFetch(`${COCKTAILS_BY_CATEGORY_URL}${category}`)
);

const fetchMealDetails = (id) => baseFetch(`${MEAL_DETAILS}${id}`);
const fetchCocktailDetails = (id) => baseFetch(`${COCKTAIL_DETAILS}${id}`);

const fetchMealRandom = () => baseFetch(RANDOM_FOOD);
const fetchCocktailRandom = () => baseFetch(RANDOM_DRINK);

// fetch para api de comidas
const fetchFoodIngredient = (ingredient) => (
  baseFetch(`${FOODS_BY_INGREDIENTS_URL}${ingredient}`)
);

// fetch para api de bebidas
const fetchDrinkIngredient = (ingredient) => (
  baseFetch(`${DRINKS_INGREDIENT_URL}${ingredient}`)
);

const fetchByFoodArea = (countrie) => (
  baseFetch(`${FOODS_BY_AREA_URL}${countrie}`)
);

const fetchFoodAreas = () => baseFetch(`${FOODS_AREAS_URL}`);

// fetch para trazer um array de ingredients
const fetchFoodIngredients = () => baseFetch(`${FOODS_BY_INGREDIENTS_URL}`);
const fetchDrinkIngredients = () => baseFetch(`${DRINKS_INGREDIENT_URL}`);

// Usado na tela de explorar por ingredients
const fetchIngredientFood = () => baseFetch(MEALS_BY_INGREDIENTS_URL);
const fetchIngredientDrink = () => baseFetch(DRINKS_BY_INGREDIENTS_URL);

const fetchFoodName = (name) => baseFetch(`${FOODS_BY_NAME_URL}${name}`);
const fetchFoodLetter = (letter) => baseFetch(`${FOODS_BY_LETTER_URL}${letter}`);

const fetchDrinkName = (name) => baseFetch(`${DRINKS_NAME_URL}${name}`);
const fetchDrinkLetter = (letter) => baseFetch(`${DRINKS_LETTER_URL}${letter}`);

export {
  fetchMeals,
  fetchCocktails,
  fetchMealsCategories,
  fetchCocktailsCategories,
  fetchMealsByCategory,
  fetchCocktailsByCategory,
  fetchMealDetails,
  fetchCocktailDetails,
  fetchMealRandom,
  fetchCocktailRandom,
  fetchFoodIngredient,
  fetchFoodName,
  fetchFoodLetter,
  fetchDrinkIngredient,
  fetchDrinkName,
  fetchDrinkLetter,
  fetchFoodIngredients,
  fetchDrinkIngredients,
  fetchIngredientFood,
  fetchIngredientDrink,
  fetchByFoodArea,
  fetchFoodAreas,
};
