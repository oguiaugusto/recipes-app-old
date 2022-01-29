import React from 'react';
import PropTypes from 'prop-types';
import { Card as C } from 'react-bootstrap';

export default function Card({ thumb, name, index }) {
  return (
    <C data-testid={ `${index}-recipe-card` } style={ { width: '18rem' } }>
      <C.Img data-testid={ `${index}-card-img` } variant="top" src={ thumb } />
      <C.Body>
        <C.Title data-testid={ `${index}-card-name` }>{name}</C.Title>
      </C.Body>
    </C>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
