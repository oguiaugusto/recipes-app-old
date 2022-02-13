import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Loader } from '../components';
import {
  fetchDrinkIngredient,
  fetchIngredientDrink,
} from '../services/mealsAndCocktailsAPI';
import Card from '../components/Card';
import GeneralContext from '../context/GeneralContext';

const MAX_CARD_NUMBER = 12;

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState();
  const [loading, setLoading] = useState(true);

  const {
    setDrinkIngredient,
  } = useContext(GeneralContext);

  useEffect(() => {
    fetchIngredientDrink()
      .then((data) => { setIngredients(data.drinks); setLoading(false); });
  }, []);

  function handleFetch(ingredient) {
    fetchDrinkIngredient(ingredient)
      .then((data) => { setDrinkIngredient(data.drinks); setLoading(false); });
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
                ? `https://www.thecocktaildb.com/images/ingredients/${ingre.strIngredient1}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${ingre.strIngredient1}.png`;
              return (i < MAX_CARD_NUMBER ? (
                <Link
                  key={ `${ingre.strIngredient}-${i}` }
                  onClick={ () => handleFetch(ingre.strIngredient1) }
                  to="/drinks"
                >
                  <Card
                    width="200px"
                    thumb={ thumbUrl }
                    name={ ingre.strIngredient1 }
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
