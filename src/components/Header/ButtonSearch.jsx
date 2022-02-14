import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

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
      <AiOutlineSearch
        data-testid="search-top-btn"
        size={ 35 }
        color="#eee"
        src={ icon }
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
