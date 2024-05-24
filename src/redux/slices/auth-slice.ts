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

export interface Bank {
    id: number;
    bank_id: string;
    bank_number: string;
    bank_account_name: string;
    api_key: string;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    bankConfig: Bank | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    bankConfig: null,
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
        setBankConfig(state, action: PayloadAction<Bank>) {
            state.bankConfig = action.payload;
        },
        updateBankConfig(state, action: PayloadAction<Bank>) {
            state.bankConfig = action.payload;
        },
    },
});

export const { loginSuccess, logoutSuccess, loadingSuccess, setBankConfig, updateBankConfig } =
    authSlice.actions;
export default authSlice.reducer;
