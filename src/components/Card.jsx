import React from 'react';
import PropTypes from 'prop-types';
import { Card as C } from 'react-bootstrap';

export default function Card({
  width, thumb, name, cardTestId, imgTestId, titleTestId,
}) {
  return (
    <C data-testid={ cardTestId } style={ { width } } className="mb-5 mx-3 text-dark">
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
};

Card.defaultProps = {
  cardTestId: '',
  imgTestId: '',
  titleTestId: '',
};
