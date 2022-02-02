import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import {
  fetchDrinkIngredient,
  fetchIngredientDrink,
} from '../services/mealsAndCocktailsAPI';
import Card from '../components/Card';
import GeneralContext from '../context/GeneralContext';

const MAX_CARD_NUMBER = 12;

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState();

  const {
    setDrinkIngredient,
  } = useContext(GeneralContext);

  useEffect(() => {
    fetchIngredientDrink()
      .then((data) => setIngredients(data.drinks));
  }, []);

  function handleFetch(ingredient) {
    fetchDrinkIngredient(ingredient)
      .then((data) => setDrinkIngredient(data.drinks));
  }

  return (
    <div>
      <Header />
      {ingredients === undefined ? null
        : (ingredients.map((ingre, i) => (i < MAX_CARD_NUMBER ? (
          <Link
            onClick={ () => handleFetch(ingre.strIngredient1) }
            to="/drinks"
          >
            <Card
              width="18rem"
              thumb={ `https://www.thecocktaildb.com/images/ingredients/${ingre.strIngredient1}-Small.png` }
              name={ ingre.strIngredient1 }
              cardTestId={ `${i}-ingredient-card` }
              imgTestId={ `${i}-card-img` }
              titleTestId={ `${i}-card-name` }
            />
          </Link>
        ) : null)))}
      <Footer />
    </div>
  );
}
