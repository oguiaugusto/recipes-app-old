import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';
import { saveMealsToken, saveCocktailsToken, saveUser } from '../services/localStorage';

export default function GeneralProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [foods, setFoods] = useState([]);
  const [foodsIngredient, setFoodIngredient] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [drinksIngredient, setDrinkIngredient] = useState([]);

  console.log(drinksIngredient);

  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const handleUser = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleJoin = () => {
    saveMealsToken();
    saveCocktailsToken();
    saveUser({ email: user.email });
  };

  const contextValue = {
    user,
    handleUser,
    handleJoin,

    foods,
    setFoods,
    foodsIngredient,
    setFoodIngredient,
    drinks,
    setDrinks,
    drinksIngredient,
    setDrinkIngredient,

    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
  };

  return (
    <GeneralContext.Provider value={ contextValue }>
      {children}
    </GeneralContext.Provider>
  );
}

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
