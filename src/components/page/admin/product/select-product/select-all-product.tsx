/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedProduct, removeSelectedProducts } from "@/redux/slices/product-slice";

export default function SelectAllProduct() {
    const dispatch = useDispatch();
    // State for check if all product is selected
    const [checked, setChecked] = useState<boolean>(false);

    // State for product list
    const products = useSelector((state: RootState) => state.product.products);
    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full"
                htmlFor="select-products"
                data-ripple-dark="true"
            >
                <input
                    id="select-products"
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        setChecked(!checked);
                    }}
                    onClick={() => {
                        setChecked(!checked);
                        if (checked) {
                            // Remove all from selected product list
                            dispatch(removeSelectedProducts());
                        } else {
                            // Add all to selected product list
                            const newProductList = products.map((product) => product.id);
                            dispatch(setSelectedProduct(newProductList));
                        }
                    }}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3758F9] checked:bg-[#3758F9] checked:before:bg-[#3758F9] hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </label>
        </div>
    );
}
