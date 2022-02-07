import React, { useState } from 'react';
import { Header, FilterBtns, LocalRecipesList } from '../components';
import '../styles/localRecipes.css';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  return (
    <div>
      <Header smallerTitle title="Receitas Favoritas" />
      <FilterBtns
        recipes={ favoriteRecipes }
        setFiltered={ setFilteredFavoriteRecipes }
      />
      <LocalRecipesList
        recipes={ filteredFavoriteRecipes }
        recipesList={ favoriteRecipes }
        storageName="favoriteRecipes"
        setRecipes={ setFavoriteRecipes }
        setFilteredRecipes={ setFilteredFavoriteRecipes }
      />
    </div>
  );
}
export default ReceitasFavoritas;
