import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  fetchCocktailsByCategory,
  fetchMealsByCategory,
} from '../services/mealsAndCocktailsAPI';

const MAX_CATEGORY_NUMBER = 5;

export default function RecipeCategories({
  food, setSelectedCategory, selectedCategory,
  setRecipes, recipes, categories, setLoading,
}) {
  const setRecipesByType = (category) => {
    if (food) {
      fetchMealsByCategory(category).then((r) => {
        setRecipes(r.meals);
        setLoading(false);
      });
    } else {
      fetchCocktailsByCategory(category).then((r) => {
        setRecipes(r.drinks);
        setLoading(false);
      });
    }
  };

  const fetchByCategory = (category) => {
    setLoading(true);
    if (category === selectedCategory) {
      setRecipes(recipes);
      setLoading(false);
      setSelectedCategory('All');
    } else {
      setRecipesByType(category);
      setSelectedCategory(category);
    }
  };

  return (
    <ButtonGroup className="categories mb-5 flex-wrap">
      <Button
        data-testid="All-category-filter"
        variant={ selectedCategory === 'All' ? 'secondary' : 'dark' }
        onClick={ () => {
          setRecipes(recipes);
          setSelectedCategory('All');
        } }
      >
        All
      </Button>
      {categories.map(({ strCategory }, i) => {
        const variant = strCategory === selectedCategory ? 'secondary' : 'dark';
        return i < MAX_CATEGORY_NUMBER ? (
          <Button
            data-testid={ `${strCategory}-category-filter` }
            key={ `category-btn-${i}` }
            variant={ variant }
            onClick={ () => fetchByCategory(strCategory) }
          >
            {strCategory}
          </Button>
        ) : null;
      })}
    </ButtonGroup>
  );
}

RecipeCategories.propTypes = {
  food: PropTypes.bool.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
};
