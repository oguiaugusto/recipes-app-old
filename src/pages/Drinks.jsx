import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Card, RecipeCategories } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchCocktails,
  fetchCocktailsCategories,
} from '../services/mealsAndCocktailsAPI';

const MAX_CARD_NUMBER = 12;

export default function Drinks() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    drinks,
    setDrinks,
    drinkCategories,
    setDrinkCategories,
  } = useContext(GeneralContext);

  const [drinksResponse, CtLoading] = useFetch(fetchCocktails);
  const [categoriesR, Cloading] = useFetch(fetchCocktailsCategories);

  useEffect(() => setDrinks(drinksResponse.drinks), [drinksResponse, setDrinks]);
  useEffect(() => setDrinkCategories(categoriesR.drinks),
    [categoriesR, setDrinkCategories]);

  let loading = (CtLoading || Cloading);
  const setLoading = (bool) => { loading = bool; };

  return (
    <div>
      <Header />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="categories-container">
          <RecipeCategories
            food={ false }
            setSelectedCategory={ setSelectedCategory }
            selectedCategory={ selectedCategory }
            setRecipes={ setDrinks }
            recipes={ drinksResponse.drinks || [] }
            categories={ drinkCategories }
            setLoading={ setLoading }
          />
          <div className="recipes-list">
            {
              drinks.map((drink, i) => (i < MAX_CARD_NUMBER ? (
                <Link key={ drink.idDrink } to={ `/drinks/${drink.idDrink}` }>
                  <Card
                    width="18rem"
                    thumb={ drink.strDrinkThumb }
                    name={ drink.strDrink }
                    cardTestId={ `${i}-recipe-card` }
                    imgTestId={ `${i}-card-img` }
                    titleTestId={ `${i}-card-name` }
                  />
                </Link>
              ) : null))
            }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
