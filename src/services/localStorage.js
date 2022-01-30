export const saveMealsToken = () => localStorage.setItem('mealsToken', 1);
export const saveCocktailsToken = () => localStorage.setItem('cocktailsToken', 1);
export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const addDoneRecipe = (recipe) => {
  const arr = localStorage.getItem('doneRecipes');
  const doneRecipes = arr ? [...JSON.parse(arr), recipe] : [recipe];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};
export const getDoneRecipes = () => {
  const arr = localStorage.getItem('doneRecipes');
  const doneRecipes = arr ? JSON.parse(arr) : [];
  return doneRecipes;
};

export const addInProgressRecipe = (recipe, type) => {
  const obj = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = obj ? {
    ...obj,
    [type]: { ...obj[type], [recipe.id]: recipe },
  } : { cocktails: {}, meals: {} };

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};
export const getInProgressRecipes = () => {
  const obj = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = obj ? JSON.parse(obj) : { cocktails: {}, meals: {} };
  return inProgressRecipes;
};

export const addFavoriteRecipe = (recipe) => {
  const arr = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = arr ? [...JSON.parse(arr), recipe] : [recipe];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};
export const removeFavoriteRecipe = (recipe) => {
  const arr = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = arr
    ? [...JSON.parse(arr)].filter((r) => r.id !== recipe.id) : [];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};
export const getFavoriteRecipes = () => {
  const arr = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = arr ? JSON.parse(arr) : [];
  return favoriteRecipes;
};
