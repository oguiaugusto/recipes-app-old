export const saveMealsToken = () => localStorage.setItem('mealsToken', 1);
export const saveCocktailsToken = () => localStorage.setItem('cocktailsToken', 1);
export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
