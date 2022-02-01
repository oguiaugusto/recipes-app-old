import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function LocalRecipesCard({ recipe, index, unFavorite, storageName }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const TWO_SECONDS = 2000;

  const copyLink = () => {
    const currentURL = window.location.href;
    const pathToReplace = storageName === 'favoriteRecipes'
      ? 'favorite-recipes' : 'done-recipes';

    const url = `${currentURL.replace(pathToReplace, '')}`
    + `${recipe.type}s/${recipe.id}`;
    copy(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), TWO_SECONDS);
  };

  const history = useHistory();
  let tags = [];
  if (storageName === 'doneRecipes') {
    tags = Array.isArray(recipe.tags) ? recipe.tags : recipe.tags.split(', ');
  }

  return (
    <Card style={ { width: '18rem' } } className="local-recipes-card">
      <Card.Img
        data-testid={ `${index}-horizontal-image` }
        variant="Top"
        src={ recipe.image }
        alt={ `${recipe.name}` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      />
      <Card.Body>
        <Card.Title
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
        >
          {recipe.name}
        </Card.Title>
        <Card.Subtitle
          data-testid={ `${index}-horizontal-top-text` }
          className="mb-2 text-muted"
        >
          {recipe.alcoholicOrNot === ''
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`}
        </Card.Subtitle>
        {
          storageName === 'doneRecipes' ? (
            <>
              <Card.Text>
                { 'Done in ' }
                <span data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </span>
              </Card.Text>
              <p className="tags">
                {
                  tags.map((t, i) => {
                    const testid = `${index}-${t}-horizontal-tag`;
                    if (i === tags.length - 1) {
                      return <span key={ testid } data-testid={ testid }>{t}</span>;
                    }
                    return (
                      <span key={ testid } data-testid={ testid }>{ `${t}, ` }</span>
                    );
                  })
                }
              </p>
            </>
          ) : null
        }
        <button type="button" onClick={ copyLink }>
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {copiedLink ? <p>Link copied!</p> : null}
        <button type="button" onClick={ (event) => unFavorite(event) }>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            className="favorite-button"
            src={ blackHeartIcon }
            alt="Desfavoritar"
            name={ recipe.name }
            style={ { width: '25px' } }
          />
        </button>
      </Card.Body>
      {/* <h1 data-testid={ `${index}-horizontal-top-text` }>
        {
          recipe.alcoholicOrNot === ''
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </h1> */}
      {/* <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </p>
      </Link> */}
      {/* <button type="button" onClick={ copyLink }>
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {copiedLink ? <p>Link copied!</p> : null}
      <button type="button" onClick={ (event) => unFavorite(event) }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          className="favorite-button"
          src={ blackHeartIcon }
          alt="Desfavoritar"
          name={ recipe.name }
          style={ { width: '25px' } }
        />
      </button> */}
    </Card>
  );
}

LocalRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  unFavorite: PropTypes.func.isRequired,
  storageName: PropTypes.string.isRequired,
};
