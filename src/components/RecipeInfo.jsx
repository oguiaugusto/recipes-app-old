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
    <div className="recipe-info px-3">
      <div className="recipe-header position-relative">
        <h1 data-testid="recipe-title" className="recipe-title mb-0 mt-2">
          {title}
        </h1>
        <p data-testid="recipe-category" className="recipe-category text-muted">
          {category}
        </p>
        <div className="recipe-header-buttons position-absolute">
          {
            isFavorite ? (
              <button
                type="button"
                className="btn-icon"
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
                className="btn-icon"
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
          <button
            data-testid="share-btn"
            type="button"
            className="btn-icon"
            onClick={ copyLink }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          {copiedLink ? (
            <p className="copied">Link copied!</p>
          ) : null}
        </div>
      </div>
      <div className="recipe-body d-md-flex flex-wrap justify-content-between">
        <div className="recipe-ingredients my-4">
          <h2 className="recipe-info-title">Ingredients</h2>
          {
            inProgress ? ingredientsCheckboxes(ingredients, measures) : (
              <ul className="list-group list-group-flush">
                {
                  ingredients.map((ingredient, i) => (
                    <li
                      key={ `ingredient-${i}-${ingredient}` }
                      className="list-group-item bg-dark text-light"
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      {
                        measures[i]
                          ? `– ${ingredient} - ${measures[i]}` : `– ${ingredient}`
                      }
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
        <div className="recipe-instructions my-4">
          <h2 className="recipe-info-title">Instructions</h2>
          <p data-testid="instructions" className="bg-dark py-3 px-4">{instructions}</p>
        </div>
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
