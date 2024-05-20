"use client";

import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alert-slice";
import authSlice from "./slices/auth-slice";
import checkoutSlice from "./slices/checkout-slice";
import customerSlice from "./slices/customer-slice";
import productSlice from "./slices/product-slice";
import invoiceSlice from "./slices/invoice-slice";
import staffSlice from "./slices/staff-slice";
import voucherSlice from "./slices/voucher-slice";
import loyalSlice from "./slices/loyal-slice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlice,
        checkout: checkoutSlice,
        customer: customerSlice,
        loyal: loyalSlice,
        product: productSlice,
        invoice: invoiceSlice,
        staff: staffSlice,
        voucher: voucherSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
