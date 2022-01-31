const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const COCKTAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const COCKTAILS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MEALS_BY_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const COCKTAILS_BY_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const MEAL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const COCKTAIL_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

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

export {
  fetchMeals,
  fetchCocktails,
  fetchMealsCategories,
  fetchCocktailsCategories,
  fetchMealsByCategory,
  fetchCocktailsByCategory,
  fetchMealDetails,
  fetchCocktailDetails,
};
