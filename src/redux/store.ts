"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alert-slice";
import authSlice from "./slices/auth-slice";
import productSlice from "./slices/product-slice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlice,
        product: productSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
