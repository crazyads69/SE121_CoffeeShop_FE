/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: number;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = true;
        },
        loadingSuccess(state) {
            state.isLoading = false;
        },
    },
});

export const { loginSuccess, logoutSuccess, loadingSuccess } = authSlice.actions;
export default authSlice.reducer;
