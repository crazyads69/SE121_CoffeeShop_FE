/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Loyal {
    id: number;
    name: string;
    spending_min: number;
    type: string; // direct or percent
    amount: number;
    updated_at: string;
    created_at: string;
}

export interface LoyalState {
    loyals: Loyal[];
    selectedLoyal: string[];
}

const initialState: LoyalState = {
    loyals: [],
    selectedLoyal: [],
};

const loyalSlice = createSlice({
    name: "loyal",
    initialState,
    reducers: {
        setLoyals: (state, action: PayloadAction<Loyal[]>) => {
            state.loyals = action.payload;
        },
        updateLoyal: (state, action: PayloadAction<Loyal>) => {
            const index = state.loyals.findIndex((loyal) => loyal.id === action.payload.id);
            state.loyals[index] = action.payload;
            // Make sure the state is updated
            state.loyals = [...state.loyals];
        },
        removeLoyal: (state, action: PayloadAction<number>) => {
            state.loyals = state.loyals.filter((loyal) => loyal.id !== action.payload);
        },
        addLoyal: (state, action: PayloadAction<Loyal>) => {
            state.loyals.push(action.payload);
        },
        setSelectedLoyal: (state, action: PayloadAction<string[]>) => {
            state.selectedLoyal = action.payload;
        },
        addSelectedLoyal: (state, action: PayloadAction<number>) => {
            if (state.selectedLoyal.includes(String(action.payload))) {
                state.selectedLoyal = state.selectedLoyal.filter(
                    // If loyal is already in the selectedLoyal array, remove it
                    (id) => id !== String(action.payload),
                );
            } else {
                // If loyal is not in the selectedLoyal array, add it
                state.selectedLoyal.push(String(action.payload));
            }
        },
        removeLoyalList: (state, action: PayloadAction<string[]>) => {
            state.loyals = state.loyals.filter(
                // Remove all selected loyals in the selectedLoyal array has been removed
                (loyal) => !action.payload.includes(String(loyal.id)),
            );
        },
        removeSelectedLoyal: (state, action: PayloadAction<number>) => {
            state.selectedLoyal = state.selectedLoyal.filter(
                // Remove selected loyal
                (id) => id !== String(action.payload),
            );
        },
        removeAllSelectedLoyals: (state) => {
            state.selectedLoyal = [];
        },
    },
});

export const {
    setLoyals,
    updateLoyal,
    removeLoyal,
    addLoyal,
    setSelectedLoyal,
    addSelectedLoyal,
    removeLoyalList,
    removeSelectedLoyal,
    removeAllSelectedLoyals,
} = loyalSlice.actions;
export default loyalSlice.reducer;
