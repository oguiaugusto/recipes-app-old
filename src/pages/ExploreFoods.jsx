import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchRandomFood } from '../services/mealsAndCocktailsAPI';

export default function ExploreFoods() {
  const [foodRandom, setFoodRandom] = useState('');

  useEffect(() => {
    fetchRandomFood()
      .then((data) => setFoodRandom(data.meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>

      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>

      <Link to={ `/explore/foods/${foodRandom}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
