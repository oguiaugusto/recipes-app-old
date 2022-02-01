import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { RecipeInfo, IngredientsCheckboxes } from '../components';
import useFetch from '../custom-hooks/useFetch';
import { addDoneRecipe } from '../services/localStorage';
import { fetchCocktailDetails } from '../services/mealsAndCocktailsAPI';
import '../styles/progress.css';

const FIFTY = 50;

export default function DrinkInProgress() {
  const { recipeId } = useParams();
  const [{ drinks }, loading] = useFetch(fetchCocktailDetails, recipeId);
  const drink = drinks ? drinks[0] : {};

  const [disableBtn, setDisableBtn] = useState(true);

  const favObj = drink !== {} ? {
    id: drink.idDrink,
    type: 'drink',
    nationality: '',
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
  } : {};

  const doneObj = drink !== {} ? {
    ...favObj,
    doneDate: new Date().toLocaleString('pt-BR').split(' ')[0],
    tags: drink.strTags || [],
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
      type="cocktails"
    />
  );
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="drink" />
          <RecipeInfo
            title={ drink.strDrink }
            category={ drink.strAlcoholic }
            recipe={ drink }
            instructions={ drink.strInstructions }
            id={ drink.idDrink }
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
              onClick={ () => addDoneRecipe(doneObj) }
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
