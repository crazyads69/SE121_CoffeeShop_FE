/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface CustomerState {
    customers: Customer[];
    selectedCustomer: string[];
}

const initialState: CustomerState = {
    customers: [],
    selectedCustomer: [],
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomers(state, action: PayloadAction<Customer[]>) {
            state.customers = action.payload;
        },
        updateCustomer(state, action: PayloadAction<Customer>) {
            const index = state.customers.findIndex(
                (customer) => customer.id === action.payload.id,
            );
            state.customers[index] = action.payload;
            // Make sure the state is updated
            state.customers = [...state.customers];
        },
        addCustomer(state, action: PayloadAction<Customer>) {
            state.customers.push(action.payload);
        },
        removeCustomer(state, action: PayloadAction<number>) {
            state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        },
        removeCustomerList(state, action: PayloadAction<string[]>) {
            state.customers = state.customers.filter(
                (customer) => !action.payload.includes(String(customer.id)),
            );
        },
        setSelectedCustomers(state, action: PayloadAction<string[]>) {
            state.selectedCustomer = action.payload;
        },
        addSelectedCustomer(state, action: PayloadAction<number>) {
            if (state.selectedCustomer.includes(String(action.payload))) {
                state.selectedCustomer = state.selectedCustomer.filter(
                    (id) => id !== String(action.payload),
                );
            } else {
                state.selectedCustomer.push(String(action.payload));
            }
        },
        removeSelectedCustomer(state, action: PayloadAction<number>) {
            state.selectedCustomer = state.selectedCustomer.filter(
                (id) => id !== String(action.payload),
            );
        },
        removeAllSelectedCustomers(state) {
            state.selectedCustomer = [];
        },
    },
});

export const {
    setCustomers,
    updateCustomer,
    addCustomer,
    removeCustomer,
    removeCustomerList,
    setSelectedCustomers,
    addSelectedCustomer,
    removeSelectedCustomer,
    removeAllSelectedCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;
