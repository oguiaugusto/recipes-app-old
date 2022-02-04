import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, Card, Loader } from '../components';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodAreas()
      .then((data) => { setCountries([...data.meals]); setLoading(false); });

    fetchMeals()
      .then((data) => { setFoodsNation(data.meals); setLoading(false); });
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
    <div className="mb-5">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="explore-recipes-page d-flex flex-column align-items-center">
          <select
            onChange={ (event) => handleFetch(event.target.value) }
            className="form-select my-3 mx-5"
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
          <div className="recipes-list d-flex flex-wrap justify-content-around">
            {
              foodsNation !== null ? foodsNation.map((food, i) => (i < MAX_CARD_NUMBER ? (
                <Link key={ food.idMeal } to={ `/foods/${food.idMeal}` }>
                  <Card
                    width="280px"
                    thumb={ food.strMealThumb }
                    name={ food.strMeal }
                    cardTestId={ `${i}-recipe-card` }
                    imgTestId={ `${i}-card-img` }
                    titleTestId={ `${i}-card-name` }
                  />
                </Link>
              ) : null)) : null
            }
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
