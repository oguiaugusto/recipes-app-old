import React, { useState } from 'react';
import { Header, FilterBtns, LocalRecipesList } from '../components';
import '../styles/localRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  return (
    <div>
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
