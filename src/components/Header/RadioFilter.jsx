import React from 'react';
import PropTypes from 'prop-types';

export default function RadioFilter({ Value, setValue, name, testid }) {
  // function fixStringForData(string) {
  //   if (string.includes('-')) {
  //     return string.replace(' ', '-').toLowerCase();
  //   }
  //   return string.toLowerCase();
  // }

  return (
    <label
      htmlFor={ `${name}-search-choice` }
    >
      {Value}
      <input
        type="radio"
        id={ `${name}-search-choice` }
        name={ name }
        value={ Value }
        data-testid={ testid }
        onChange={ ({ target: { value } }) => setValue(value) }
      />
    </label>
  );
}

RadioFilter.propTypes = {
  Value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
