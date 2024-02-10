"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
