import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function LocalRecipesCard({ recipe, index, unFavorite, storageName }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const TWO_SECONDS = 2000;

  useEffect(() => {
    setIsFavorite(getFavoriteRecipes().some((r) => r.id === recipe.id));
  }, [recipe.id, isFavorite]);

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

  const renderUnfavoriteBtn = () => ((isFavorite && storageName === 'doneRecipes') ? (
    <button
      type="button"
      className="btn-icon"
      onClick={ () => {
        removeFavoriteRecipe(recipe);
        setIsFavorite(false);
      } }
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        name={ recipe.name }
        alt="favorite icon black"
      />
    </button>
  ) : (
    <button
      type="button"
      onClick={ (event) => unFavorite(event) }
      className="btn-icon"
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        className="favorite-button"
        src={ blackHeartIcon }
        alt="Desfavoritar"
        name={ recipe.name }
      />
    </button>
  ));

  return (
    <Card style={ { width: '280px' } } className="local-recipes-card mb-5 mx-3 text-dark">
      <Card.Img
        data-testid={ `${index}-horizontal-image` }
        variant="Top"
        src={ recipe.image }
        alt={ `${recipe.name}` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      />
      <Card.Body className="d-flex flex-column">
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
        <div className="share-and-favorite-btns align-self-end position-relative">
          <button type="button" onClick={ copyLink } className="btn-icon">
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {
            isFavorite ? renderUnfavoriteBtn() : (
              <button
                type="button"
                className="btn-icon"
                onClick={ () => {
                  addFavoriteRecipe(recipe);
                  setIsFavorite(true);
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ whiteHeartIcon }
                  alt="favorite icon white"
                />
              </button>
            )
          }
          {copiedLink ? <p className="copied position-absolute">Link copied!</p> : null}
        </div>
      </Card.Body>
    </Card>
  );
}

LocalRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  unFavorite: PropTypes.func.isRequired,
  storageName: PropTypes.string.isRequired,
};
