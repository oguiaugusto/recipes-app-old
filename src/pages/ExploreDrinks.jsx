import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchCocktailRandom } from '../services/mealsAndCocktailsAPI';

export default function ExploreDrinks() {
  const [drinkRandom, setDrinkRandom] = useState('');

  useEffect(() => {
    fetchCocktailRandom()
      .then((data) => setDrinkRandom(data.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explore/drinks/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>

      <Link to={ `/drinks/${drinkRandom}` }>
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
