"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alert-slice";
import authSlices from "./slices/auth-slice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlices,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
