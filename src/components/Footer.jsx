import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer px-3 py-2 d-flex flex-row justify-content-around"
    >
      <Link to="/drinks">
        <button type="button" className="btn-icon">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks icon" />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button" className="btn-icon">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button" className="btn-icon">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
        </button>
      </Link>
    </footer>
  );
}
