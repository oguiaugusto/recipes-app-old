import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../styles/explore.css';
import '../styles/buttons-page.css';

export default function Explore() {
  const buttonsPageClass = 'buttons-page text-light px-4 my-3 '
    + 'd-flex flex-column align-items-center';

  return (
    <div>
      <Header title="Explore" />
      <div className={ buttonsPageClass }>
        <Link to="explore/foods">
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-foods"
          >
            Explore Foods
          </Button>
        </Link>
        <Link to="explore/drinks">
          <Button
            variant="outline-light"
            type="button"
            className="page-btns my-2"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
