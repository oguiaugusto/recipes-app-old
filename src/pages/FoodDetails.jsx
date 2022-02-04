import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from '../custom-hooks/useFetch';
import { Loader, RecipeInfo, Recommendations } from '../components';
import { fetchMealDetails, fetchCocktails } from '../services/mealsAndCocktailsAPI';
import { getDoneRecipes, getInProgressRecipes } from '../services/localStorage';
import '../styles/details.css';

// Por um (nenhum pouco) claro problema no teste 32,
// preciso fazer a requisição para os detalhes da comida
// com 50ms de atraso, já que o mock não cobre o fetch necessário para essa requisição

const REQUEST_TO = 50;

export default function FoodDetails() {
  const { recipeId } = useParams();

  const [meals, setMeals] = useState();
  const [MLoading, setMLoading] = useState(true);
  const [{ drinks }, DLoading] = useFetch(fetchCocktails);
  const loading = (MLoading || DLoading);

  useEffect(() => {
    setTimeout(() => {
      fetchMealDetails(recipeId).then((r) => {
        setMeals(r.meals);
        setMLoading(false);
      });
    }, REQUEST_TO);
  }, [recipeId]);

  const meal = meals ? meals[0] : {};

  const favObj = meal !== {} ? {
    id: meal.idMeal,
    type: 'food',
    nationality: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb,
  } : {};

  const youtubeLink = meals ? (
    meal.strYoutube.split('/watch?v=').join('/embed/')
  ) : '';

  return (
    <div className="recipe-details text-light d-flex flex-column">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="recipe-photo">
            <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="meal" />
          </div>
          <RecipeInfo
            title={ meal.strMeal }
            category={ meal.strCategory }
            recipe={ meal }
            instructions={ meal.strInstructions }
            id={ meal.idMeal }
            favObj={ favObj }
          />
          <div className="recipe-video d-flex flex-column align-items-center mb-4">
            <h2 className="recipe-info-title">Video</h2>
            <div className="iframe-container bg-dark">
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ youtubeLink }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <Recommendations recipes={ drinks } drink={ false } />
          {
            getDoneRecipes().some((r) => r.id === recipeId) ? null : (
              <Link to={ `/foods/${recipeId}/in-progress` }>
                <Button
                  variant="warning"
                  data-testid="start-recipe-btn"
                  type="button"
                  className="fixed-bottom"
                  style={ { width: '100%' } }
                >
                  {
                    getInProgressRecipes().meals[recipeId]
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
