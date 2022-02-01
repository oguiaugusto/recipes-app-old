import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function FilterBtns({ recipes, setFiltered }) {
  const handleClick = (event) => {
    let { name } = event.target;
    if (name === 'comida') {
      name = 'food';
    } else if (name === 'bebida') {
      name = 'drink';
    } else {
      name = '';
    }
    const getFavoriteRecipes = recipes.filter((recipe) => (
      recipe.type.includes(name)
    ));
    setFiltered(getFavoriteRecipes);
  };

  return (
    <div>
      <Button
        data-testid="filter-by-all-btn"
        variant="dark"
        name="comidas-bebidas"
        type="button"
        onClick={ handleClick }
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        variant="dark"
        name="comida"
        type="button"
        onClick={ handleClick }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        variant="dark"
        name="bebida"
        type="button"
        onClick={ handleClick }
      >
        Drinks
      </Button>
    </div>
  );
}

FilterBtns.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFiltered: PropTypes.func.isRequired,
};
