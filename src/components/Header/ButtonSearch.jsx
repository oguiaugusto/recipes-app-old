import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonSearch({ boolean, setBoolean, icon }) {
  return (
    <button
      type="button"
      onClick={ () => setBoolean(boolean) }
    >
      <img
        data-testid="search-top-btn"
        src={ icon }
        alt="search"
      />
    </button>
  );
}

ButtonSearch.propTypes = {
  boolean: PropTypes.bool.isRequired,
  setBoolean: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};
