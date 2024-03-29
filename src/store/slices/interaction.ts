import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    interactionTypes: [],
    currentLead: null,
};

const slice = createSlice({
    name: 'interaction',
    initialState,
    reducers: {
        getInteractionTypesSuccess: (state, action) => {
            state.interactionTypes = action.payload;
        },
    }
});

export const interaction: any = slice.reducer;
export const interactionActions: any = slice.actions;