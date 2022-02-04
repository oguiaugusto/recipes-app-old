import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from '../custom-hooks/useFetch';
import { Loader, RecipeInfo, Recommendations } from '../components';
import { fetchCocktailDetails, fetchMeals } from '../services/mealsAndCocktailsAPI';
import { getDoneRecipes, getInProgressRecipes } from '../services/localStorage';
import '../styles/details.css';

export default function DrinkDetails() {
  const { recipeId } = useParams();

  const [{ drinks }, DLoading] = useFetch(fetchCocktailDetails, recipeId);
  const [{ meals }, MLoading] = useFetch(fetchMeals);
  const loading = (DLoading || MLoading);

  const drink = drinks ? drinks[0] : {};

  const favObj = drink !== {} ? {
    id: drink.idDrink,
    type: 'drink',
    nationality: '',
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
  } : {};

  return (
    <div className="recipe-details text-light d-flex flex-column">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="recipe-photo">
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt="drink"
            />
          </div>
          <RecipeInfo
            title={ drink.strDrink }
            category={ drink.strAlcoholic }
            recipe={ drink }
            instructions={ drink.strInstructions }
            id={ drink.idDrink }
            favObj={ favObj }
          />
          <Recommendations recipes={ meals } drink />
          {
            getDoneRecipes().some((r) => r.id === recipeId) ? null : (
              <Link to={ `/drinks/${recipeId}/in-progress` }>
                <Button
                  variant="warning"
                  data-testid="start-recipe-btn"
                  type="button"
                  className="fixed-bottom"
                  style={ { width: '100%' } }
                >
                  {
                    getInProgressRecipes().cocktails[recipeId]
                      ? 'Continue Recipe' : 'Start Recipe'
                  }
                </Button>
              </Link>
            )
          }
        </>
      )}
    </div>
  );
}
