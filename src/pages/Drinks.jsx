import React, { useContext, useEffect, useState } from 'react';
import { Header, Footer, Card, RecipeCategories, Loader } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchCocktails,
  fetchCocktailsCategories,
} from '../services/mealsAndCocktailsAPI';

export default function Drinks() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    drinks,
    setDrinks,
    drinkCategories,
    setDrinkCategories,
    drinksIngredient,
    globalLoading,
  } = useContext(GeneralContext);

  const [drinksResponse, drinksLoading] = useFetch(fetchCocktails);
  const [categoriesR, categoriesLoading] = useFetch(fetchCocktailsCategories);

  useEffect(() => {
    setDrinks(drinksIngredient.length ? drinksIngredient : drinksResponse.drinks);
  }, [drinksIngredient, drinksResponse, setDrinks]);

  useEffect(() => setDrinkCategories(categoriesR.drinks),
    [categoriesR, setDrinkCategories]);

  let loading = (drinksLoading || categoriesLoading || globalLoading);
  const setLoading = (bool) => { loading = bool; };

  return (
    <div className="mb-5">
      <Header title="Drinks" />
      {loading ? (
        <Loader />
      ) : (
        <div className="categories-container text-light d-flex flex-column">
          <RecipeCategories
            food={ false }
            setSelectedCategory={ setSelectedCategory }
            selectedCategory={ selectedCategory }
            setRecipes={ setDrinks }
            recipes={ drinksResponse.drinks || [] }
            categories={ drinkCategories }
            setLoading={ setLoading }
          />
          <div className="recipes-list d-flex flex-wrap justify-content-around">
            {
              drinks.map((drink, i) => (
                <Card
                  key={ drink.idDrink }
                  width="280px"
                  thumb={ drink.strDrinkThumb }
                  name={ drink.strDrink }
                  cardTestId={ `${i}-recipe-card` }
                  imgTestId={ `${i}-card-img` }
                  titleTestId={ `${i}-card-name` }
                  recipeUrl={ `/drinks/${drink.idDrink}` }
                />
              ))
            }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
