"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alert-slice";
import authSlice from "./slices/auth-slice";
import customerSlice from "./slices/customer-slice";
import productSlice from "./slices/product-slice";
import invoiceSlice from "./slices/invoice-slice";
import staffSlice from "./slices/staff-slice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlice,
        customer: customerSlice,
        product: productSlice,
        invoice: invoiceSlice,
        staff: staffSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
