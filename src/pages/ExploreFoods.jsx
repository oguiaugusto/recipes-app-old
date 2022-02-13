import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchMealRandom } from '../services/mealsAndCocktailsAPI';

export default function ExploreFoods() {
  const [foodRandom, setFoodRandom] = useState('');

  useEffect(() => {
    fetchMealRandom()
      .then((data) => setFoodRandom(data.meals[0].idMeal));
  }, []);

  const buttonsPageClass = 'buttons-page text-light px-4 my-3 '
    + 'd-flex flex-column align-items-center';

  return (
    <div>
      <Header smallerTitle title="Explore Foods" />
      <div className={ buttonsPageClass }>
        <Link to="/explore/foods/ingredients">
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </Button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </Button>
        </Link>
        <Link to={ `/foods/${foodRandom}` }>
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
