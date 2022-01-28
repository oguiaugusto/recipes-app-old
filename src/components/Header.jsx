import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

export default function Header() {
  const { location: { pathname } } = window;

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

  const [isInput, setIsInput] = useState(false);

  function handleIsInput(input) {
    return input ? setIsInput(!input) : setIsInput(!input);
  }

  const buttonSearch = (
    <button
      type="button"
      onClick={ () => handleIsInput(isInput) }
    >
      <img
        data-testid="search-top-btn"
        src={ imageSearch }
        alt="search"
      />
    </button>
  );

  const inputSearch = (
    <input
      type="text"
      data-testid="search-input"
    />
  );

  return (
    <header>
      <h1 data-testid="page-title">{ fixTitle(pathname) }</h1>
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
      { checkPathname ? buttonSearch : null }
      { isInput ? inputSearch : null }
    </header>
  );
}
