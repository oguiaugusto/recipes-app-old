import React, { useState } from 'react';
import { Header, FilterBtns, LocalRecipesList } from '../components';
import '../styles/localRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  return (
    <div className="local-recipes-list d-flex flex-column">
      <Header title="Receitas Favoritas" />
      <FilterBtns
        recipes={ doneRecipes }
        setFiltered={ setFilteredDoneRecipes }
      />
      <LocalRecipesList
        recipes={ filteredDoneRecipes }
        recipesList={ doneRecipes }
        storageName="doneRecipes"
        setRecipes={ setDoneRecipes }
        setFilteredRecipes={ setFilteredDoneRecipes }
      />
    </div>
  );
}
