import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  FoodDetails,
  DrinkDetails,
  FoodInProgress,
  DrinkInProgress,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsByIngredients,
  ExploreDrinksByIngredients,
  ExploreFoodsByNationalities,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
  NotFound,
} from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/drinks/:recipe-id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksByIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsByNationalities }
      />
      <Route path="/foods/:recipeId" component={ FoodDetails } />
      <Route path="/drinks/:recipeId" component={ DrinkDetails } />
      <Route path="/foods/:recipeId/in-progress" component={ FoodInProgress } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
