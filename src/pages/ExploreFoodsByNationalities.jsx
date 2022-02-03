import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Card } from '../components';
import {
  fetchByFoodArea,
  fetchFoodAreas,
  fetchMeals,
} from '../services/mealsAndCocktailsAPI';

const MAX_CARD_NUMBER = 12;
const ALL = 'All';

export default function ExploreFoodsByNationalities() {
  const [countries, setCountries] = useState([]);
  const [foodsNation, setFoodsNation] = useState([]);

  useEffect(() => {
    fetchFoodAreas()
      .then((data) => setCountries([...data.meals]));

    fetchMeals()
      .then((data) => setFoodsNation(data.meals));
  }, []);

  function handleFetch(value) {
    if (value === 'All') {
      fetchMeals(value)
        .then((data) => setFoodsNation(data.meals))
        .catch(() => setFoodsNation(foodsNation));
    }
    fetchByFoodArea(value)
      .then((data) => setFoodsNation(data.meals))
      .catch(() => setFoodsNation(foodsNation));
  }

  return (
    <div>
      <Header />
      <select
        onChange={ (event) => handleFetch(event.target.value) }
        name="countries"
        data-testid="explore-by-nationality-dropdown"
      >
        <option
          data-testid={ `${ALL}-option` }
          key={ ALL }
          value={ ALL }
        >
          {ALL}
        </option>

        { countries !== [] ? countries.map(
          (countrie, i) => (
            <option
              key={ i }
              value={ countrie.strArea }
              data-testid={ `${countrie.strArea}-option` }
            >
              {countrie.strArea}
            </option>),
        ) : null }
      </select>

      {
        foodsNation !== null ? foodsNation.map((food, i) => (i < MAX_CARD_NUMBER ? (
          <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
            <Card
              width="18rem"
              thumb={ food.strMealThumb }
              name={ food.strMeal }
              cardTestId={ `${i}-recipe-card` }
              imgTestId={ `${i}-card-img` }
              titleTestId={ `${i}-card-name` }
            />
          </Link>
        ) : null)) : null
      }

      <Footer />
    </div>
  );
}
