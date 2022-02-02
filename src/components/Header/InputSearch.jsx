import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export default function InputSearch({ handleChange, v }) {
  return (
    <Form.Control
      type="text"
      data-testid="search-input"
      placeholder="Type something"
      value={ v }
      onChange={ ({ target: { value } }) => handleChange(value) }
    />
  );
}

InputSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  v: PropTypes.string.isRequired,
};
