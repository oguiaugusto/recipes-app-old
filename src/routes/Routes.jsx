import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Foods, Drinks, Explore,
  ExploreDrinks, ExploreFoods,
  ExploreIngredientsFoods,
  ExploreIngredientsDrinks,
  ExploreNationalities, Profile, DoneRecipes, FavoriteRecipes } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreIngredientsFoods }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreIngredientsDrinks }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
