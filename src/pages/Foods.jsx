import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Card, RecipeCategories, Loader } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchMeals,
  fetchMealsCategories,
} from '../services/mealsAndCocktailsAPI';
import '../styles/recipes.css';

const MAX_CARD_NUMBER = 12;

export default function Foods() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    foods,
    setFoods,
    foodCategories,
    setFoodCategories,
    foodsIngredient,
    globalLoading,
  } = useContext(GeneralContext);

  const [foodResponse, Floading] = useFetch(fetchMeals);
  const [categoriesR, Cloading] = useFetch(fetchMealsCategories);

  useEffect(() => {
    setFoods(foodsIngredient !== null
      && foodsIngredient.length ? foodsIngredient : foodResponse.meals);
  }, [foodResponse, foodsIngredient, setFoods]);

  useEffect(() => setFoodCategories(categoriesR.meals),
    [categoriesR, setFoodCategories]);

  let loading = (Floading || Cloading || globalLoading);
  const setLoading = (bool) => { loading = bool; };

  return (
    <div className="mb-5">
      <Header title="Foods" />
      {loading ? (
        <Loader />
      ) : (
        <div className="foods-container text-light d-flex flex-column">
          <RecipeCategories
            food
            setSelectedCategory={ setSelectedCategory }
            selectedCategory={ selectedCategory }
            setRecipes={ setFoods }
            recipes={ foodResponse.meals || [] }
            categories={ foodCategories }
            setLoading={ setLoading }
          />
          <div className="recipes-list d-flex flex-wrap justify-content-around">
            {
              foods.map((food, i) => (i < MAX_CARD_NUMBER ? (
                <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
                  <Card
                    width="280px"
                    thumb={ food.strMealThumb }
                    name={ food.strMeal }
                    cardTestId={ `${i}-recipe-card` }
                    imgTestId={ `${i}-card-img` }
                    titleTestId={ `${i}-card-name` }
                  />
                </Link>
              ) : null))
            }
          </div>
        </div>
      ) }
      <Footer />
    </div>
  );
}
