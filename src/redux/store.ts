"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import authSlices from "./slices/authSlices";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlices,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
