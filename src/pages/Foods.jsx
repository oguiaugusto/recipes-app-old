import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Card, RecipeCategories } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchMeals,
  fetchMealsCategories,
} from '../services/mealsAndCocktailsAPI';

const MAX_CARD_NUMBER = 12;

export default function Foods() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    foods,
    setFoods,
    foodCategories,
    setFoodCategories,
  } = useContext(GeneralContext);

  const [foodResponse, Floading] = useFetch(fetchMeals);
  const [categoriesR, Cloading] = useFetch(fetchMealsCategories);

  useEffect(() => setFoods(foodResponse.meals), [foodResponse, setFoods]);
  useEffect(() => setFoodCategories(categoriesR.meals),
    [categoriesR, setFoodCategories]);

  let loading = (Floading || Cloading);
  const setLoading = (bool) => { loading = bool; };

  return (
    <div>
      <Header />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="foods-container">
          <RecipeCategories
            food
            setSelectedCategory={ setSelectedCategory }
            selectedCategory={ selectedCategory }
            setRecipes={ setFoods }
            recipes={ foodResponse.meals || [] }
            categories={ foodCategories }
            setLoading={ setLoading }
          />
          <div className="recipes-list">
            {
              foods.map((food, i) => (i < MAX_CARD_NUMBER ? (
                <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
                  <Card
                    width="18rem"
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
