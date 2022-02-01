import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { RecipeInfo, IngredientsCheckboxes } from '../components';
import useFetch from '../custom-hooks/useFetch';
import { fetchMealDetails } from '../services/mealsAndCocktailsAPI';
import '../styles/progress.css';

const FIFTY = 50;

export default function FoodInProgress() {
  const { recipeId } = useParams();
  const [{ meals }, loading] = useFetch(fetchMealDetails, recipeId);
  const meal = meals ? meals[0] : {};

  const [disableBtn, setDisableBtn] = useState(true);

  const favObj = meal !== {} ? {
    id: meal.idMeal,
    type: 'food',
    nationality: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb,
  } : {};

  const handleDisabled = (bool) => {
    setTimeout(() => {
      setDisableBtn(bool);
    }, FIFTY);
  };

  const ingredientsCheckboxes = (ingredients, measures) => (
    <IngredientsCheckboxes
      ingredients={ ingredients }
      measures={ measures }
      setFunction={ handleDisabled }
      type="meals"
    />
  );

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="drink" />
          <RecipeInfo
            title={ meal.strMeal }
            category={ meal.strCategory }
            recipe={ meal }
            instructions={ meal.strInstructions }
            id={ meal.idMeal }
            favObj={ favObj }
            inProgress
            ingredientsCheckboxes={ ingredientsCheckboxes }
          />
          <Link to="/done-recipes">
            <Button
              variant="warning"
              data-testid="finish-recipe-btn"
              type="button"
              className="fixed-bottom"
              disabled={ disableBtn }
            >
              Finish Recipe
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
