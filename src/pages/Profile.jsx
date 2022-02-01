import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

export default function Profile() {
  let user = JSON.parse(localStorage.getItem('user'));
  user = user || { email: '' };
  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">{user.email}</p>
        <Link to="/done-recipes">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
