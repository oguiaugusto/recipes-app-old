import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import {
  getFavoriteRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const TWO_SECONDS = 2000;

const filterValuesFromObject = (obj, entrieName) => (
  Object.entries(obj)
    .filter((e) => e[0].includes(entrieName) && e[1])
    .map((v) => v[1])
);

export default function RecipeInfo({
  title, category, recipe, instructions, id, favObj, inProgress, ingredientsCheckboxes,
}) {
  const ingredients = recipe !== {}
    ? filterValuesFromObject(recipe, 'strIngredient') : [];
  const measures = recipe !== {}
    ? filterValuesFromObject(recipe, 'strMeasure') : [];

  const [copiedLink, setCopiedLink] = useState(false);

  const copyLink = () => {
    let windowUrl = window.location.href;
    if (inProgress) windowUrl = windowUrl.split('/in-progress').join('');
    copy(windowUrl);
    setCopiedLink(true);

    setTimeout(() => setCopiedLink(false), TWO_SECONDS);
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavoriteRecipes().some((r) => r.id === id));
  }, [id, isFavorite]);

  return (
    <div className="recipe-info">
      <div className="recipe-header">
        <p data-testid="recipe-title" className="recipe-title">
          {title}
        </p>
        <p data-testid="recipe-category" className="recipe-category">
          {category}
        </p>
        <div className="recipe-header-buttons">
          {
            isFavorite ? (
              <button
                type="button"
                onClick={ () => {
                  removeFavoriteRecipe(favObj);
                  setIsFavorite(false);
                } }
              >
                <img
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  alt="favorite icon black"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={ () => {
                  addFavoriteRecipe(favObj);
                  setIsFavorite(true);
                } }
              >
                <img
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="favorite icon white"
                />
              </button>
            )
          }
          <button data-testid="share-btn" type="button" onClick={ copyLink }>
            <img src={ shareIcon } alt="share icon" />
          </button>
          {copiedLink ? <p>Link copied!</p> : null}
        </div>
      </div>
      <div className="recipe-ingredients">
        <p className="recipe-info-title">Ingredients</p>
        {
          inProgress ? ingredientsCheckboxes(ingredients, measures) : (
            <ul>
              {
                ingredients.map((ingredient, i) => (
                  <li
                    key={ `ingredient-${i}-${ingredient}` }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {`– ${ingredient} - ${measures[i]}`}
                  </li>
                ))
              }
            </ul>
          )
        }

      </div>
      <div className="recipe-instructions">
        <p className="recipe-info-title">Instructions</p>
        <p data-testid="instructions">{instructions}</p>
      </div>
    </div>
  );
}

RecipeInfo.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  instructions: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  favObj: PropTypes.objectOf(PropTypes.any).isRequired,
  inProgress: PropTypes.bool,
  ingredientsCheckboxes: PropTypes.func,
};

RecipeInfo.defaultProps = {
  inProgress: false,
  ingredientsCheckboxes: () => {},
};
