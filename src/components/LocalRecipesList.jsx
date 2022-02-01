import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LocalRecipesCard from './LocalRecipesCard';

function LocalRecipesList({
  recipes, recipesList, storageName, setRecipes, setFilteredRecipes,
}) {
  const unFavorite = (event) => {
    const { name } = event.target;
    const filteredRecipes = recipesList.filter((recipe) => (
      recipe.name !== name
    ));
    localStorage.setItem(storageName, JSON.stringify(filteredRecipes));
    const recipesLocalStorage = JSON.parse(localStorage
      .getItem(storageName));
    setRecipes(recipesLocalStorage);
    setFilteredRecipes(recipesLocalStorage);
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
    <div>
      {
        recipes.map((recipe, index) => (
          <LocalRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            unFavorite={ unFavorite }
          />
        ))
      }
    </div>
  );
}

LocalRecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  recipesList: PropTypes.arrayOf(PropTypes.any).isRequired,
  storageName: PropTypes.string.isRequired,
  setRecipes: PropTypes.func.isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default LocalRecipesList;
