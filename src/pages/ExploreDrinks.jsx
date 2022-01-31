import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchRandomDrink } from '../services/mealsAndCocktailsAPI';

export default function ExploreDrinks() {
  const [drinkRandom, setDrinkRandom] = useState('');

  useEffect(() => {
    fetchRandomDrink()
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

      <Link to="/explore/drinks/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>

      <Link to={ `/explore/drinks/${drinkRandom}` }>
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
