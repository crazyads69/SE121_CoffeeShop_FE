/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product-slice";

export interface CheckoutItem {
    productID: string;
    quantity: number;
    unit_price: number;
}

export interface CheckoutList {
    items: CheckoutItem[];
    productList: Product[];
    totalPrice: number;
    discountPrice: number;
    voucherCode: string | null;
    note: string | null;
    customerPhone: string | null;
    tableNumber: number;
}

export interface CheckoutState {
    checkoutList: CheckoutList;
}

const initialState: CheckoutState = {
    checkoutList: {
        items: [],
        productList: [],
        totalPrice: 0,
        discountPrice: 0,
        voucherCode: null,
        note: null,
        customerPhone: null,
        tableNumber: 0,
    },
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addProductToCheckoutList(state, action: PayloadAction<CheckoutItem>) {
            // Check if the product is already in the list
            const existingProductIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload.productID,
            );
            // If the product is already in the list, update the quantity
            // Otherwise, add the product to the list
            if (existingProductIndex !== -1) {
                state.checkoutList.items[existingProductIndex].quantity += action.payload.quantity;
            } else {
                state.checkoutList.items.push(action.payload);
            }
        },
        decreaseProductQuantityInCheckoutList(state, action: PayloadAction<string>) {
            const existingProductIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload,
            );
            if (existingProductIndex !== -1) {
                state.checkoutList.items[existingProductIndex].quantity -= 1;
            }
        },
        updateProductQuantityInCheckoutList(state, action: PayloadAction<CheckoutItem>) {
            const existingProductIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload.productID,
            );
            if (existingProductIndex !== -1) {
                state.checkoutList.items[existingProductIndex].quantity = action.payload.quantity;
            }
        },
        removeProductFromCheckoutList(state, action: PayloadAction<string>) {
            state.checkoutList.items = state.checkoutList.items.filter(
                (item) => item.productID !== action.payload,
            );
        },
        updateProductInCheckoutList(state, action: PayloadAction<CheckoutItem>) {
            const existingProductIndex = state.checkoutList.items.findIndex(
                (item) => item.productID === action.payload.productID,
            );
            if (existingProductIndex !== -1) {
                state.checkoutList.items[existingProductIndex] = action.payload;
            }
        },
        updateTotalPrice: (state, action: PayloadAction<number>) => {
            state.checkoutList.totalPrice = action.payload;
        },
        updateDiscountPrice: (state, action: PayloadAction<number>) => {
            state.checkoutList.discountPrice = action.payload;
        },
        updateVoucherCode: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.voucherCode = action.payload;
        },
        updateNote: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.note = action.payload;
        },
        updateCustomerPhone: (state, action: PayloadAction<string | null>) => {
            state.checkoutList.customerPhone = action.payload;
        },
        updateTableNumber: (state, action: PayloadAction<number>) => {
            state.checkoutList.tableNumber = action.payload;
        },
        clearCheckoutList: (state) => {
            state.checkoutList = initialState.checkoutList;
        },
        addToProductList: (state, action: PayloadAction<Product>) => {
            // Check if the product is already in the list
            const existingProductIndex = state.checkoutList.productList.findIndex(
                (product) => product.id === action.payload.id,
            );
            // If the product is not in the list, add it
            if (existingProductIndex === -1) {
                state.checkoutList.productList.push(action.payload);
            }
            // If the product is already in the list, update the product
            else {
                state.checkoutList.productList[existingProductIndex] = action.payload;
            }
        },
        clearProductList: (state) => {
            state.checkoutList.productList = [];
        },
    },
});

export const {
    addProductToCheckoutList,
    decreaseProductQuantityInCheckoutList,
    updateProductQuantityInCheckoutList,
    removeProductFromCheckoutList,
    updateProductInCheckoutList,
    updateTotalPrice,
    updateDiscountPrice,
    updateVoucherCode,
    updateNote,
    updateCustomerPhone,
    updateTableNumber,
    clearCheckoutList,
    addToProductList,
    clearProductList,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
