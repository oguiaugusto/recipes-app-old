import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer, Card } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchMeals,
  fetchMealsCategories,
  fetchMealsByCategory,
} from '../services/mealsAndCocktailsAPI';

const MAX_CARD_NUMBER = 12;
const MAX_CATEGORY_NUMBER = 5;

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

  const getBtnVariant = (category) => (
    category === selectedCategory ? 'success' : 'dark'
  );

  const fetchByCategory = (category) => {
    loading = true;
    if (category === selectedCategory) {
      setFoods(foodResponse.meals);
      loading = false;
      setSelectedCategory('All');
    } else {
      fetchMealsByCategory(category).then((r) => {
        setFoods(r.meals);
        loading = false;
      });
      setSelectedCategory(category);
    }
  };

  return (
    <div>
      <Header />
      {loading ? <h2>Loading...</h2> : (
        <div className="foods-container">
          <div className="categories">
            <Button
              data-testid="All-category-filter"
              variant={ selectedCategory === 'All' ? 'success' : 'dark' }
              onClick={ () => {
                setFoods(foodResponse.meals);
                setSelectedCategory('All');
              } }
            >
              All
            </Button>
            {
              foodCategories.map(({ strCategory }, i) => {
                const variant = getBtnVariant(strCategory);
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
              })
            }
          </div>
          <div className="foods-list">
            {
              foods.map((food, i) => ((i < MAX_CARD_NUMBER) ? (
                <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
                  <Card
                    thumb={ food.strMealThumb }
                    name={ food.strMeal }
                    index={ i }
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
