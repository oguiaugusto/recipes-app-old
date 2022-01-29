import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer, Card } from '../components';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchCocktails,
  fetchCocktailsCategories,
  fetchCocktailsByCategory,
} from '../services/mealsAndCocktailsAPI';

const MAX_CARD_NUMBER = 12;
const MAX_CATEGORY_NUMBER = 5;

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

  const getBtnVariant = (category) => (
    category === selectedCategory ? 'success' : 'dark'
  );

  const fetchByCategory = (category) => {
    if (category === selectedCategory) {
      setDrinks(drinksResponse.drinks);
      loading = false;
      setSelectedCategory('All');
    } else {
      fetchCocktailsByCategory(category).then((r) => {
        setDrinks(r.drinks);
        loading = false;
        setSelectedCategory(category);
      });
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="categories-container">
          <div className="categories">
            <Button
              data-testid="All-category-filter"
              variant={ selectedCategory === 'All' ? 'success' : 'dark' }
              onClick={ () => {
                setDrinks(drinksResponse.drinks);
                setSelectedCategory('All');
              } }
            >
              All
            </Button>
            {
              drinkCategories.map(({ strCategory }, i) => {
                const variant = getBtnVariant(strCategory);
                return (i < MAX_CATEGORY_NUMBER) ? (
                  <Button
                    data-testid={ `${strCategory}-category-filter` }
                    key={ `category-btn-${i}` }
                    variant={ variant }
                    onClick={ () => fetchByCategory(strCategory) }
                  >
                    {strCategory}
                  </Button>
                ) : null;
              })
            }
          </div>
          <div className="foods-list">
            {
              drinks.map((drink, i) => (i < MAX_CARD_NUMBER ? (
                <Link key={ drink.idDrink } to={ `/drinks/${drink.idDrink}` }>
                  <Card
                    thumb={ drink.strDrinkThumb }
                    name={ drink.strDrink }
                    index={ i }
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
