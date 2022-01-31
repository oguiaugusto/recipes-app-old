import React from 'react';
import PropTypes from 'prop-types';

export default function InputSearch({ handleChange }) {
  return (
    <input
      type="text"
      data-testid="search-input"
      onChange={ ({ target: { value } }) => handleChange(value) }
    />
  );
}

InputSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
