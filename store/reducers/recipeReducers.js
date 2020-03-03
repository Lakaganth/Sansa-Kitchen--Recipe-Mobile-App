import {
  GET_CATEGORIES,
  ADD_RECIPE,
  GET_RECIPES,
  RECIPE_LISITNER
} from "../actions/recipeActions";
import { ADD_CATEGORY } from "./../actions/recipeActions";

const initialState = {
  categories: [],
  recipes: [],
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return { ...state };
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case ADD_RECIPE:
      // const newRecipe = state.recipes;
      // newRecipe.push(action.recipe);
      return { ...state };
    case GET_RECIPES:
      return { ...state, recipes: action.recipes };
    case RECIPE_LISITNER:
      return {
        ...state,
        recipies: action.recListner.recipes,
        favourites: action.recListner.favourites
      };
    default:
      return state;
  }
};
