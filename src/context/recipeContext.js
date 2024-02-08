import React, { useState, createContext } from "react";

// Create Context Object
export const RecipeContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const RecipeContextProvider = props => {
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider value={[recipes, setRecipes]}>
      {props.children}
    </RecipeContext.Provider>
  );
};