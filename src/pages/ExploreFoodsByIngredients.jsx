import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchFoodIngredients } from '../services/radioButtonApi';

const MAX_CARD_NUMBER = 12;

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    fetchFoodIngredients()
      .then((data) => setIngredients(data.meals));
  }, []);

  return (
    <div>
      <Header />
      {ingredients === undefined ? null
        : (ingredients.map((ingredient, i) => (i < MAX_CARD_NUMBER ? (
          <Link to="/foods">
            <div key={ i } data-testid={ `${i}-ingredient-card>` }>
              <img
                alt={ ingredient.strMeal }
                src={ ingredient.strMealThumb }
                data-testid={ `${i}-card-img` }
              />
              <p data-testid={ `${i}-card-name` }>{ ingredient.strMeal }</p>
            </div>
          </Link>
        ) : null)))}
      <Footer />
    </div>
  );
}
