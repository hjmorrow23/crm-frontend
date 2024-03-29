import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    paymentTypes: [],
    currentLead: null,
};

const slice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        getPaymentTypesSuccess: (state, action) => {
            state.paymentTypes = action.payload;
        },
    }
});

export const payment: any = slice.reducer;
export const paymentActions: any = slice.actions;