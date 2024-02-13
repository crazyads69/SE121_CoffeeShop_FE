/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
    messages: string | null;
    type: string | null;
    showMessage: boolean;
}

const initialState: AlertState = {
    messages: null,
    type: null,
    showMessage: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.messages = action.payload;
            state.type = "error";
            state.showMessage = true;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.messages = action.payload;
            state.type = "success";
            state.showMessage = true;
        },
        clearMessage: (state) => {
            state.messages = null;
            state.type = null;
            state.showMessage = false;
        },
    },
});

export const { setError, clearMessage, setSuccess } = alertSlice.actions;
export default alertSlice.reducer;
