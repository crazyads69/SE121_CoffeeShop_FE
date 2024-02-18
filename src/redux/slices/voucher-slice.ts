/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Voucher {
    id: number;
    voucher_code: string;
    type: "percent" | "direct";
    amount: number;
    quantity: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export interface VoucherState {
    vouchers: Voucher[];
    selectedVoucher: string[];
}

const initialState: VoucherState = {
    vouchers: [],
    selectedVoucher: [],
};

const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {
        setVouchers(state, action: PayloadAction<Voucher[]>) {
            state.vouchers = action.payload;
        },
        updateVoucher(state, action: PayloadAction<Voucher>) {
            const index = state.vouchers.findIndex((voucher) => voucher.id === action.payload.id);
            state.vouchers[index] = action.payload;
            // Make sure the state is updated
            state.vouchers = [...state.vouchers];
        },
        addVoucher(state, action: PayloadAction<Voucher>) {
            state.vouchers.push(action.payload);
        },
        removeVoucher(state, action: PayloadAction<number>) {
            state.vouchers = state.vouchers.filter((voucher) => voucher.id !== action.payload);
        },
        removeVoucherList(state, action: PayloadAction<string[]>) {
            state.vouchers = state.vouchers.filter(
                (voucher) => !action.payload.includes(String(voucher.id)),
            );
        },
        setSelectedVouchers(state, action: PayloadAction<string[]>) {
            state.selectedVoucher = action.payload;
        },
        addSelectedVoucher(state, action: PayloadAction<number>) {
            if (state.selectedVoucher.includes(String(action.payload))) {
                state.selectedVoucher = state.selectedVoucher.filter(
                    (id) => id !== String(action.payload),
                );
            } else {
                state.selectedVoucher.push(String(action.payload));
            }
        },
        removeSelectedVoucher(state, action: PayloadAction<number>) {
            state.selectedVoucher = state.selectedVoucher.filter(
                (id) => id !== String(action.payload),
            );
        },
        clearSelectedVouchers(state) {
            state.selectedVoucher = [];
        },
    },
});

export const {
    setVouchers,
    updateVoucher,
    addVoucher,
    removeVoucher,
    removeVoucherList,
    setSelectedVouchers,
    addSelectedVoucher,
    removeSelectedVoucher,
    clearSelectedVouchers,
} = voucherSlice.actions;
export default voucherSlice.reducer;
