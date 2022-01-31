import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

function handleIsSearch(setFunc, type, pathname, valueSearch) {
  const msgAlert = 'Your search must have only 1 (one) character';
  switch (type) {
  case 'Ingredient':
    if (pathname === '/foods') {
      fetchFoodIngredient(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkIngredient(valueSearch)
        .then((data) => setFunc(data.meals));
    }
    break;
  case 'Name':
    if (pathname === '/foods') {
      fetchFoodName(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkName(valueSearch)
        .then((data) => setFunc(data.meals));
    }
    break;
  case 'First Letter':
    if (valueSearch.length > 1) return global.alert(msgAlert);
    if (pathname === '/foods') {
      fetchFoodLetter(valueSearch)
        .then((data) => setFunc(data.meals));
    } else {
      fetchDrinkLetter(valueSearch)
        .then((data) => setFunc(data.meals));
    }
    break;
  default:
    break;
  }
}

export default function Header() {
  const { location: { pathname } } = window;

  const [foods, setFoods] = useState([]); // Foods é uma array com o retorno da api.
  const [searchValue, setsearchValue] = useState('');
  const [isInput, setIsInput] = useState(false);
  const [typeRadio, setTypeRadio] = useState('');

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

  const checkPathname = (
    fixTitle(pathname) === 'Foods'
    || fixTitle(pathname) === 'Explore Nationalities'
    || fixTitle(pathname) === 'Drinks'
  );

  console.log(foods);

  fetchDrinkIngredient();
  return (
    <header>
      <h1 data-testid="page-title">{fixTitle(pathname)}</h1>

      <Link to="/profile">
        <button
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ imageProfile }
            alt="profile"
          />
        </button>
      </Link>

      {/* checkPathname verifica o nome da rota. A depender da rota ela renderiza o button search */}
      {checkPathname ? (
        <ButtonSearch
          boolean={ !isInput }
          setBoolean={ setIsInput }
          icon={ imageSearch }
        />
      )
        : null}
      {/* Faz aparecer o input de texto. isInput alterna entre true and false ao ser clicado. */}
      {isInput ? (
        <InputSearch handleChange={ setsearchValue } />)
        : null}

      <div>
        <RadioFilter
          Value="Ingredient"
          setValue={ setTypeRadio }
          name="search"
        />

        <RadioFilter
          Value="Name"
          setValue={ setTypeRadio }
          name="search"
        />

        <RadioFilter
          Value="First Letter"
          setValue={ setTypeRadio }
          name="search"
        />

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleIsSearch(setFoods, typeRadio, pathname, searchValue) }
        >
          Search
        </button>
      </div>
    </header>
  );
}
