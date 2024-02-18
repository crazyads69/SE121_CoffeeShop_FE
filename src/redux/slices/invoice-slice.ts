/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceDetail {
    id: number;
    invoice_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    created_at: string;
    updated_at: string;
    unit_price: number;
}

// Interface for staff in invoices
export interface Staff {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: number;
    created_at: string;
    updated_at: string;
}
// Interface for vouchers in invoices
export interface Voucher {
    id: number;
    voucher_code: string;
    type: string;
    amount: number;
    quantity: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}
// Interface for customers in invoices
export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}
// Interface for invoices
export interface Invoice {
    id: number;
    user_id: number;
    customer_id: number;
    table_number: number | null;
    voucher_code: string;
    note: string | null;
    total_price: number;
    discount_price: number;
    final_price: number;
    status: string;
    created_at: string;
    updated_at: string;
    invoice_details: InvoiceDetail[];
    customer: Customer | null;
    staff: Staff | null;
    voucher: Voucher | null;
}

export interface InvoiceState {
    invoices: Invoice[];
}

const initialState: InvoiceState = {
    invoices: [],
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<Invoice[]>) => {
            state.invoices = action.payload;
        },
        updateInvoice: (state, action: PayloadAction<Invoice>) => {
            const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
            state.invoices[index] = action.payload;
            // Make sure the state is updated
            state.invoices = [...state.invoices];
        },
    },
});

export const { setInvoices, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
