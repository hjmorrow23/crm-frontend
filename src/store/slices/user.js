import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: null,
};

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.user = null;
        }
    }
});

export const user = slice.reducer;
export default user;
export const userActions = slice.actions;