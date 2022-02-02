import React, { useState, useEffect, useContext } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import {
  fetchFoodIngredient,
  fetchFoodName, fetchFoodLetter, fetchDrinkIngredient,
  fetchDrinkName, fetchDrinkLetter,
} from '../services/radioButtonApi';
import ButtonSearch from './Header/ButtonSearch';
import InputSearch from './Header/InputSearch';
import RadioFilter from './Header/RadioFilter';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import { fetchMeals, fetchCocktails } from '../services/mealsAndCocktailsAPI';

function handleIsSearch(setFunc, type, pathname, valueSearch) {
  const msgAlert = 'Your search must have only 1 (one) character';

  switch (type) {
  case 'Ingredient':
    if (pathname.includes('/foods')) {
      fetchFoodIngredient(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkIngredient(valueSearch)
        .then((data) => setFunc(data.drinks))
        .catch(() => setFunc(null));
    }
    break;
  case 'Name':
    if (pathname.includes('/foods')) {
      fetchFoodName(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkName(valueSearch)
        .then((data) => setFunc(data.drinks))
        .catch(() => setFunc(null));
    }
    break;
  case 'First Letter':
    if (valueSearch.length > 1) return global.alert(msgAlert);
    if (pathname.includes('/foods')) {
      fetchFoodLetter(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkLetter(valueSearch)
        .then((data) => setFunc(data.drinks))
        .catch(() => setFunc(null));
    }
    break;
  default:
    break;
  }
}

function fixTitle(string, separator = ' ') {
  string = string.split('/').join(' ').trim();

  if (string.split(' ').length > 2) {
    string = string.split(' ').filter((_e, i) => i !== 1).join(' ');
  }

  if (string.includes('-')) string = string.split('-').join(' ');

  return string
    .split(separator)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
}

export default function Header() {
  const { location: { pathname } } = window;
  const { setFoods, setDrinks } = useContext(GeneralContext);

  const [recipes, setRecipes] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [isInput, setIsInput] = useState(false);
  const [typeRadio, setTypeRadio] = useState('Ingredient');

  const [defaultFoods] = useFetch(fetchMeals);
  const [defaultDrinks] = useFetch(fetchCocktails);
  const ALERT = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    if (pathname.includes('/foods')) setFoods(recipes);
    if (pathname.includes('/drinks')) setDrinks(recipes);
    setsearchValue('');
  }, [pathname, recipes, setDrinks, setFoods]);

  const checkPathname = (
    fixTitle(pathname) === 'Foods'
    || fixTitle(pathname) === 'Explore Nationalities'
    || fixTitle(pathname) === 'Drinks'
  );

  if (recipes === null) {
    if (pathname.includes('/foods')) {
      setRecipes(defaultFoods.meals);
    } else {
      setRecipes(defaultDrinks.drinks);
    }
    setsearchValue('');
    return global.alert(ALERT);
  }

  if (recipes.length === 1) {
    return (pathname.includes('/foods'))
      ? <Redirect to={ `${pathname}/${recipes[0].idMeal}` } /> : (
        <Redirect to={ `${pathname}/${recipes[0].idDrink}` } />
      );
  }

  return (
    <header className="header px-3 py-2 d-flex flex-column">
      <div className="header-top d-flex justify-content-between align-self-sm-center">
        <Link to="/profile">
          <button type="button" className="btn-icon">
            <img
              data-testid="profile-top-btn"
              src={ imageProfile }
              alt="profile"
            />
          </button>
        </Link>
        <h1 data-testid="page-title" className="mb-0">{fixTitle(pathname)}</h1>
        {/* checkPathname verifica o nome da rota. A depender da rota ela renderiza o button search */}
        {checkPathname ? (
          <ButtonSearch
            boolean={ !isInput }
            setBoolean={ setIsInput }
            icon={ imageSearch }
          />
        )
          : null}
      </div>
      <div className="header-bottom d-sm-flex align-items-center align-self-sm-center">
        {/* Faz aparecer o input de texto. isInput alterna entre true and false ao ser clicado. */}
        {isInput ? (
          <InputGroup className="mt-2 mt-sm-1">
            <InputSearch handleChange={ setsearchValue } v={ searchValue } />
            <Button
              variant="warning"
              type="button"
              data-testid="exec-search-btn"
              disabled={ searchValue === '' || typeRadio === '' }
              onClick={ () => (
                handleIsSearch(setRecipes, typeRadio, pathname, searchValue)
              ) }
            >
              Search
            </Button>
          </InputGroup>
        )
          : null}
        <div className="radio-buttons mt-3 d-flex justify-content-around mt-sm-2 mx-md-3">
          <RadioFilter
            Value="Ingredient"
            setValue={ setTypeRadio }
            typeRadio={ typeRadio }
            name="search"
            testid="ingredient-search-radio"
          />
          <RadioFilter
            Value="Name"
            setValue={ setTypeRadio }
            typeRadio={ typeRadio }
            name="search"
            testid="name-search-radio"
          />
          <RadioFilter
            Value="First Letter"
            setValue={ setTypeRadio }
            typeRadio={ typeRadio }
            name="search"
            testid="first-letter-search-radio"
          />
        </div>
      </div>
    </header>
  );
}
