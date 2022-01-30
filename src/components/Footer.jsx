import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks icon" />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
        </button>
      </Link>
    </div>
  );
}
