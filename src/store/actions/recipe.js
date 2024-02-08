import { recipeActions } from "../slices/recipe";
import api from '../../api'

const { getRecipesSuccess, getRecipeSuccess, updateRecipeSuccess } = recipeActions;
const apiBase = process.env.REACT_APP_API_URL;

export const getRecipes = () => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/recipes`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(getRecipesSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const getRecipe = (id) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/recipes/${id}`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        if(!data.message) {
            dispatch(getRecipeSuccess(data));
        }
        
    } catch(err) {
        console.error(err);
    }
}

export const updateRecipe = (id, recipe) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/recipes/${id}`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(updateRecipeSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const createRecipe = (recipe) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/recipes`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(updateRecipeSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const deleteRecipe = (id) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/recipes/${id}`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        console.log(data);
    } catch(err) {
        console.error(err);
    }
}