import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LocalRecipesCard from './LocalRecipesCard';

function LocalRecipesList({
  recipes, recipesList, filterName, storageName, setRecipes, setFilteredRecipes,
}) {
  const unFavorite = (event) => {
    const { name } = event.target;
    const filteredRecipes = recipesList.filter((recipe) => (
      recipe.name !== name
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
    const recipesLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));

    if (storageName === 'favoriteRecipes') {
      setRecipes(recipesLocalStorage);
      setFilteredRecipes(recipesLocalStorage.filter((r) => r.type.includes(filterName)));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(storageName)) {
      localStorage.setItem(storageName, JSON.stringify([]));
    } else {
      const recipesLocalStorage = JSON.parse(localStorage
        .getItem(storageName));
      setRecipes(recipesLocalStorage);
      setFilteredRecipes(recipesLocalStorage);
    }
  }, [setFilteredRecipes, setRecipes, storageName]);

  return (
    <div className="recipes-local-list d-flex flex-wrap justify-content-around">
      {
        recipes.map((recipe, index) => (
          <LocalRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            unFavorite={ unFavorite }
            storageName={ storageName }
          />
        ))
      }
    </div>
  );
}

LocalRecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  recipesList: PropTypes.arrayOf(PropTypes.any).isRequired,
  filterName: PropTypes.string.isRequired,
  storageName: PropTypes.string.isRequired,
  setRecipes: PropTypes.func.isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default LocalRecipesList;
