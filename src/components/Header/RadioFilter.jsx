import React from 'react';
import PropTypes from 'prop-types';

export default function RadioFilter({ Value, setValue, name }) {
  function fixStringForData(string) {
    // if (string.includes('-')) {
    //   return string.replace(' ', '-').toLowerCase();
    // }
    return string;
  }

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
        data-testid={ `${fixStringForData(Value)}-search-radio` }
        onChange={ ({ target: { value } }) => setValue(value) }
      />
    </label>
  );
}

RadioFilter.propTypes = {
  Value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
