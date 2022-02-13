import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchCocktailRandom } from '../services/mealsAndCocktailsAPI';

export default function ExploreDrinks() {
  const [drinkRandom, setDrinkRandom] = useState('');

  useEffect(() => {
    fetchCocktailRandom()
      .then((data) => setDrinkRandom(data.drinks[0].idDrink));
  }, []);

  const buttonsPageClass = 'buttons-page text-light px-4 my-3 '
    + 'd-flex flex-column align-items-center';

  return (
    <div>
      <Header smallerTitle title="Explore Drinks" />
      <div className={ buttonsPageClass }>
        <Link to="/explore/drinks/ingredients">
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </Button>
        </Link>
        <Link to={ `/drinks/${drinkRandom}` }>
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-surprise"
          >
            Surprise me!
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
