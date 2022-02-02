import React from 'react';
import PropTypes from 'prop-types';

export default function RadioFilter({ Value, setValue, name, testid, typeRadio }) {
  return (
    <div className="form-check">
      <input
        type="radio"
        id={ `${Value}-search-choice` }
        name={ name }
        value={ Value }
        data-testid={ testid }
        checked={ typeRadio === Value }
        className="form-check-input"
        onChange={ ({ target: { value } }) => setValue(value) }
      />
      <label
        htmlFor={ `${Value}-search-choice` }
        className="form-check-label"
      >
        {Value}
      </label>
    </div>
  );
}

RadioFilter.propTypes = {
  Value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  typeRadio: PropTypes.string.isRequired,
};
