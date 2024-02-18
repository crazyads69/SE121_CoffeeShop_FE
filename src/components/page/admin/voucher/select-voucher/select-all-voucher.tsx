/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedVouchers, clearSelectedVouchers } from "@/redux/slices/voucher-slice";

export default function SelectAllVoucher() {
    const dispatch = useDispatch();
    // State for check if all voucher is selected
    const [checked, setChecked] = useState<boolean>(false);
    // State for voucher list
    const vouchers = useSelector((state: RootState) => state.voucher.vouchers);
    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full"
                htmlFor="select-vouchers"
                data-ripple-dark="true"
            >
                <input
                    id="select-vouchers"
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        setChecked(!checked);
                    }}
                    onClick={() => {
                        setChecked(!checked);
                        if (checked) {
                            // Remove all from selected voucher list
                            dispatch(clearSelectedVouchers());
                        } else {
                            // Add all to selected voucher list
                            const newProductList = vouchers.map((voucher) => String(voucher.id));
                            dispatch(setSelectedVouchers(newProductList));
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
