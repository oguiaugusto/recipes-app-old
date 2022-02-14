import React from 'react';
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlineExplore, MdWineBar } from 'react-icons/md';
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
          <MdWineBar
            data-testid="drinks-bottom-btn"
            size={ 30 }
            color="#eee"
            src={ drinkIcon }
          />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button" className="btn-icon">
          <MdOutlineExplore
            data-testid="explore-bottom-btn"
            size={ 30 }
            color="#eee"
            src={ exploreIcon }
          />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button" className="btn-icon">
          <IoFastFoodOutline
            data-testid="food-bottom-btn"
            size={ 30 }
            color="#eee"
            src={ mealIcon }
          />
        </button>
      </Link>
    </footer>
  );
}
