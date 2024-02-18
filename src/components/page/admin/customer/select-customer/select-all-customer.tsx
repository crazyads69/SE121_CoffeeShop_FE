/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

import { removeAllSelectedCustomers, setSelectedCustomers } from "@/redux/slices/customer-slice";

export default function SelectAllCustomer() {
    const dispatch = useDispatch();
    // State for check if all product is selected
    const [checked, setChecked] = useState<boolean>(false);
    const customers = useSelector((state: RootState) => state.customer.customers);
    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full"
                htmlFor="select-customers"
                data-ripple-dark="true"
            >
                <input
                    id="select-customers"
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        setChecked(!checked);
                    }}
                    onClick={() => {
                        setChecked(!checked);
                        if (checked) {
                            dispatch(removeAllSelectedCustomers());
                        } else {
                            // Add all to selected product list
                            const newCustomerList = customers.map((customer) =>
                                String(customer.id),
                            );
                            dispatch(setSelectedCustomers(newCustomerList));
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
