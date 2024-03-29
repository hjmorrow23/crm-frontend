import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    leads: [],
    currentLead: null,
};

const slice = createSlice({
    name: 'lead',
    initialState,
    reducers: {
        getLeadsSuccess: (state, action) => {
            state.leads = action.payload;
        },
        getLeadSuccess: (state, action) => {
            state.currentLead = action.payload;
        }, 
        updateLeadSuccess: (state, action) => {
            state.currentLead = action.payload;
        },
        deleteLeadSuccess: (state, action) => {
            state.currentLead = null;
        }
    }
});

export const lead: any = slice.reducer;
export const leadActions: any = slice.actions;