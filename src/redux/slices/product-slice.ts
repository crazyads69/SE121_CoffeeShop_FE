/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: string;
    name: string;
    image: string;
    type: string;
    unit_price: number;
    created_at: string;
    updated_at: string;
}

export interface ProductState {
    products: Product[];
    selectedProduct: string[];
}

const initialState: ProductState = {
    products: [],
    selectedProduct: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            state.products[index] = action.payload;
            // Make sure the state is updated
            state.products = [...state.products];
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        removeAllSelectedProducts(state, action: PayloadAction<string[]>) {
            // Remove all selected products in the selectedProduct array
            action.payload.forEach((id) => {
                state.products = state.products.filter((product) => product.id !== id);
            });
            state.selectedProduct = [];
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        setSelectedProduct(state, action: PayloadAction<string[]>) {
            state.selectedProduct = action.payload;
        },
        addSelectedProduct(state, action: PayloadAction<string>) {
            // Check if the product is already in the selectedProduct array
            if (state.selectedProduct.includes(action.payload)) {
                // If it is, remove it
                state.selectedProduct = state.selectedProduct.filter((id) => id !== action.payload);
            } else {
                // If it's not, add it
                state.selectedProduct.push(action.payload);
            }
        },
        removeSelectedProduct(state, action: PayloadAction<string>) {
            state.selectedProduct = state.selectedProduct.filter((id) => id !== action.payload);
        },
        removeSelectedProducts(state) {
            state.selectedProduct = [];
        },
    },
});

export const {
    setProducts,
    updateProduct,
    removeProduct,
    removeAllSelectedProducts,
    addProduct,
    setSelectedProduct,
    addSelectedProduct,
    removeSelectedProduct,
    removeSelectedProducts,
} = productSlice.actions;
export default productSlice.reducer;
