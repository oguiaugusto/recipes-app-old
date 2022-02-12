import React, { useState } from 'react';
import { Header, FilterBtns, LocalRecipesList } from '../components';
import '../styles/localRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [filterName, setFilterName] = useState('');

  return (
    <div className="local-recipes-list d-flex flex-column">
      <Header smallerTitle title="Receitas Favoritas" />
      <FilterBtns
        recipes={ doneRecipes }
        setFiltered={ setFilteredDoneRecipes }
        setFilterName={ setFilterName }
      />
      <LocalRecipesList
        recipes={ filteredDoneRecipes }
        recipesList={ doneRecipes }
        filterName={ filterName }
        storageName="doneRecipes"
        setRecipes={ setDoneRecipes }
        setFilteredRecipes={ setFilteredDoneRecipes }
      />
    </div>
  );
}
