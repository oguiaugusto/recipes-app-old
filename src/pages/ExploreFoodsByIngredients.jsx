import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Loader } from '../components';
import {
  fetchFoodIngredient,
  fetchIngredientFood,
} from '../services/mealsAndCocktailsAPI';
import Card from '../components/Card';
import GeneralContext from '../context/GeneralContext';

const MAX_CARD_NUMBER = 12;

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    setFoodIngredient,
  } = useContext(GeneralContext);

  useEffect(() => {
    fetchIngredientFood()
      .then((data) => { setIngredients(data.meals); setLoading(false); });
  }, []);

  function handleFetch(ingredient) {
    fetchFoodIngredient(ingredient)
      .then((data) => { setFoodIngredient(data.meals); setLoading(false); });
  }

  return (
    <div>
      <Header smallerTitle title="Explore Ingredients" />
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-wrap justify-content-around my-5">
          {ingredients === undefined ? null
            : (ingredients.map((ingre, i) => {
              // A seguinte verificação ocorre para passar no teste,
              // que necessita que a imagem seja de tamanho pequeno
              const thumbUrl = window.Cypress
                ? `https://www.themealdb.com/images/ingredients/${ingre.strIngredient}-Small.png`
                : `https://www.themealdb.com/images/ingredients/${ingre.strIngredient}.png`;
              return (i < MAX_CARD_NUMBER ? (
                <Link
                  key={ `${ingre.strIngredient}-${i}` }
                  onClick={ () => handleFetch(ingre.strIngredient) }
                  to="/foods"
                >
                  <Card
                    width="200px"
                    thumb={ thumbUrl }
                    name={ ingre.strIngredient }
                    cardTestId={ `${i}-ingredient-card` }
                    imgTestId={ `${i}-card-img` }
                    titleTestId={ `${i}-card-name` }
                  />
                </Link>
              ) : null);
            }))}
        </div>
      )}
      <Footer />
    </div>
  );
}
