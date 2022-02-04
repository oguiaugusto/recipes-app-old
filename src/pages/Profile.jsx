import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../styles/buttons-page.css';

export default function Profile() {
  let user = JSON.parse(localStorage.getItem('user'));
  user = user || { email: '' };

  const buttonsPageClass = 'buttons-page text-light px-4 my-3 '
    + 'd-flex flex-column align-items-center';

  return (
    <div>
      <Header />
      <div className={ buttonsPageClass }>
        <p data-testid="profile-email" className="profile-email mb-1">{user.email}</p>
        <Link to="/done-recipes">
          <Button
            variant="outline-light"
            data-testid="profile-done-btn"
            className="page-btns my-2"
            type="button"
          >
            Done Recipes
          </Button>
        </Link>
        <Link to="/favorite-recipes">
          <Button
            variant="outline-light"
            data-testid="profile-favorite-btn"
            className="page-btns my-2"
            type="button"
          >
            Favorite Recipes
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="outline-light"
            data-testid="profile-logout-btn"
            className="page-btns my-2"
            type="button"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
