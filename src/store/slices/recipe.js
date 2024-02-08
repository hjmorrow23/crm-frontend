import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    recipes: [],
    currentRecipe: null,
};

const slice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        getRecipesSuccess: (state, action) => {
            state.recipes = action.payload;
        },
        getRecipeSuccess: (state, action) => {
            state.currentRecipe = action.payload;
        }, 
        updateRecipeSuccess: (state, action) => {
            state.currentRecipe = action.payload;
        },
        deleteRecipeSuccess: (state, action) => {
            state.currentRecipe = null;
        }
    }
});

export const recipe = slice.reducer;
export const recipeActions = slice.actions;