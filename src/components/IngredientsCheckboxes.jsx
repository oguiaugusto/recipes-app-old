import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { addInProgressRecipe, getInProgressRecipes } from '../services/localStorage';

const getIngredientsObj = (arr) => Object.fromEntries(arr.map((i) => [i, false]));

export default function IngredientsCheckboxes({
  ingredients, measures, type, setFunction,
}) {
  const { recipeId } = useParams();
  const inProgressRecipe = getInProgressRecipes()[type][recipeId];
  const [checkedIngredients, setCheckedIngredients] = useState(
    inProgressRecipe || getIngredientsObj(ingredients),
  );

  const handleCheckbox = ({ target: { name, checked } }) => {
    const obj = { ...checkedIngredients, [name]: checked };
    setCheckedIngredients(obj);
    addInProgressRecipe(obj, type, recipeId);
  };

  const disableBtn = checkedIngredients
    ? Object.entries(checkedIngredients).some((i) => !i[1]) : true;

  setFunction(disableBtn);

  return (
    <div>
      <form>
        {
          ingredients.map((ingredient, i) => {
            const ingredientClass = checkedIngredients && checkedIngredients[ingredient]
              ? 'done-ingredient' : '';
            const ingredientChecked = checkedIngredients
              ? checkedIngredients[ingredient] : false;
            return (
              <div
                key={ `ingredient-${i}-${ingredient}` }
                data-testid={ `${i}-ingredient-step` }
                className={ `form-check form-switch mb-2 ms-4 ${ingredientClass}` }
              >
                <label htmlFor={ ingredient } className={ `${ingredientClass}` }>
                  <input
                    type="checkbox"
                    name={ ingredient }
                    id={ `${i}-ingredient-step` }
                    className="form-check-input"
                    role="switch"
                    defaultChecked={ ingredientChecked }
                    onChange={ handleCheckbox }
                  />
                  { `${ingredient} - ${measures[i]}` }
                </label>
              </div>
            );
          })
        }
      </form>
    </div>
  );
}

IngredientsCheckboxes.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.any).isRequired,
  measures: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  setFunction: PropTypes.func.isRequired,
};
