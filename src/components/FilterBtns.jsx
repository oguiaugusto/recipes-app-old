import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FilterBtns({ recipes, setFiltered, setFilterName }) {
  const [activeBtn, setActiveBtn] = useState('all');

  const handleClick = (event) => {
    let { name } = event.target;
    setActiveBtn(name);

    if (name === 'all') name = '';

    const getFavoriteRecipes = recipes.filter((recipe) => (
      recipe.type.includes(name)
    ));
    setFilterName(name);
    setFiltered(getFavoriteRecipes);
  };

  return (
    <ButtonGroup className="d-flex mb-5 ">
      <Button
        data-testid="filter-by-all-btn"
        variant={ activeBtn === 'all' ? 'light' : 'secondary' }
        name="all"
        type="button"
        onClick={ handleClick }
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        variant={ activeBtn === 'food' ? 'light' : 'secondary' }
        name="food"
        type="button"
        onClick={ handleClick }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        variant={ activeBtn === 'drink' ? 'light' : 'secondary' }
        name="drink"
        type="button"
        onClick={ handleClick }
      >
        Drinks
      </Button>
    </ButtonGroup>
  );
}

FilterBtns.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFiltered: PropTypes.func.isRequired,
  setFilterName: PropTypes.func.isRequired,
};
