import React, { useState } from 'react';
import { Header, FilterBtns, LocalRecipesList } from '../components';
import '../styles/localRecipes.css';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);
  const [filterName, setFilterName] = useState('');

  return (
    <div>
      <Header smallerTitle title="Receitas Favoritas" />
      <FilterBtns
        recipes={ favoriteRecipes }
        setFiltered={ setFilteredFavoriteRecipes }
        setFilterName={ setFilterName }
      />
      <LocalRecipesList
        recipes={ filteredFavoriteRecipes }
        recipesList={ favoriteRecipes }
        filterName={ filterName }
        storageName="favoriteRecipes"
        setRecipes={ setFavoriteRecipes }
        setFilteredRecipes={ setFilteredFavoriteRecipes }
      />
    </div>
  );
}
export default ReceitasFavoritas;
