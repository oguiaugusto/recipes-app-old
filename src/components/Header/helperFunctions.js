export function fixTitle(string, separator = ' ') {
  string = string.split('recipes-app').join(' ').trim();
  string = string.split('/').join(' ').trim();

  if (string.split(' ').length > 2) {
    string = string.split(' ').filter((_e, i) => i !== 1).join(' ');
  }

  if (string.includes('-')) string = string.split('-').join(' ');

  return string
    .split(separator)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
}

export function setRecipesFoodsOrDrinks(pathname, setFoods, setDrinks, recipes) {
  if (pathname.includes('/foods')) setFoods(recipes);
  if (pathname.includes('/drinks')) setDrinks(recipes);
}
