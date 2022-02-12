import React from 'react';
import PropTypes from 'prop-types';

const THREE_HUNDRED = 300;

export default function ButtonSearch({ boolean, setBoolean, icon, setHeaderBottomOpen }) {
  return (
    <button
      type="button"
      className="btn-icon"
      onClick={ () => {
        setHeaderBottomOpen(boolean);
        if (!boolean) {
          setTimeout(() => setBoolean(boolean), THREE_HUNDRED);
        } else {
          setBoolean(boolean);
        }
      } }
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
  setHeaderBottomOpen: PropTypes.func.isRequired,
};
