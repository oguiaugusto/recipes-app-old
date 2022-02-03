import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import Card from './Card';

const TWO = 2;
const SIX = 6;

const separateArrayByPairs = (arr) => (
  arr.map((v, i) => i % 2 === 0 && arr.slice(i, i + TWO)).filter((v) => v)
);

export default function Recommendations({ recipes, drink }) {
  const recipesArrays = recipes
    ? separateArrayByPairs([...recipes].filter((_m, i) => i < SIX)) : [];

  return (
    <div className="recipe-recommendations pb-4">
      <h2 className="recipe-info-title px-3 py-2">Recommended</h2>
      <div className="recommendeds-cards">
        <Carousel>
          {recipesArrays.map((recipesPair, index) => (
            <Carousel.Item key={ `recommendation-pair-${index}` }>
              <div className="recommendation-pair d-flex justify-content-around">
                {recipesPair.map((r, i) => {
                  const recipeUrl = drink ? `/foods/${r.idMeal}` : `/drinks/${r.idDrink}`;
                  return (
                    <Card
                      key={ `recomendation-card-${i + index + index}` }
                      width="45%"
                      thumb={ drink ? r.strMealThumb : r.strDrinkThumb }
                      name={ drink ? r.strMeal : r.strDrink }
                      cardTestId={ `${i + index + index}-recomendation-card` }
                      titleTestId={ `${i + index + index}-recomendation-title` }
                      recipeUrl={ recipeUrl }
                    />
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

Recommendations.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  drink: PropTypes.bool.isRequired,
};
