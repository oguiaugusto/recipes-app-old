import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card as C } from 'react-bootstrap';

export default function Card({
  width, thumb, name, cardTestId, imgTestId, titleTestId, recipeUrl,
}) {
  const history = useHistory();

  return (
    <C
      data-testid={ cardTestId }
      style={ { width, cursor: 'pointer' } }
      className="mb-5 mx-3 text-dark"
      onClick={ () => (recipeUrl !== '' ? history.push(recipeUrl) : null) }
    >
      <C.Img data-testid={ imgTestId } variant="top" src={ thumb } />
      <C.Body>
        <C.Title data-testid={ titleTestId }>{name}</C.Title>
      </C.Body>
    </C>
  );
}

Card.propTypes = {
  width: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cardTestId: PropTypes.string,
  imgTestId: PropTypes.string,
  titleTestId: PropTypes.string,
  recipeUrl: PropTypes.string,
};

Card.defaultProps = {
  cardTestId: '',
  imgTestId: '',
  titleTestId: '',
  recipeUrl: '',
};
