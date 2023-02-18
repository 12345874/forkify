import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const recipe = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    searchedRecipe: [],
    prevVal: 0,
    nextVal: 2,
    currentVal: 1,
    currentData: [],
    selectedRecipeData: {},
    bookmarkData: [],
    addRecipeObj: {}
  });

  return (
    <recipe.Provider value={{ state, dispatch }}>{children}</recipe.Provider>
  );
};

export default Context;

export const RecipeState = () => {
  return useContext(recipe);
};
