import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchDrinkIngredients } from '../services/radioButtonApi';

const MAX_CARD_NUMBER = 12;

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    fetchDrinkIngredients()
      .then((data) => setIngredients(data.drink));
  }, []);

  return (
    <div>
      <Header />
      {ingredients === undefined ? null
        : (ingredients.map((ingredient, i) => (i < MAX_CARD_NUMBER ? (
          <Link to="/drinks">
            <div key={ i } data-testid={ `${i}-ingredient-card>` }>
              <img
                alt={ ingredient.strDrink }
                src={ ingredient.strDrink }
                data-testid={ `${i}-card-img` }
              />
              <p data-testid={ `${i}-card-name` }>{ ingredient.strDrink }</p>
            </div>
          </Link>
        ) : null)))}
      <Footer />
    </div>
  );
}
