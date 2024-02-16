import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Invoice } from "@/redux/slices/invoice-slice";
import { USER_ROLE } from "@/utils/constant/constant";
import PostInvoiceFinish from "@/api/billing/post-invoice-finish";
import PostInvoicePending from "@/api/billing/post-invoice-pending";

export interface StatusDropdownProps {
    status: string;
    invoice: Invoice;
}

export default function StatusDropdown({ status, invoice }: StatusDropdownProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const handleStatusChange = async () => {
        // If status is pending, change to finish
        // If status is finish then can't change anymore
        if (status === "pending") {
            // Call api to update invoice status
            await PostInvoiceFinish(invoice, dispatch);
        } else if (user?.role === USER_ROLE.ADMIN && status === "finish") {
            // If user is admin, can change status from finish to pending
            // Call api to update invoice status
            await PostInvoicePending(invoice, dispatch);
        }
    };
    return (
        <button
            type="button"
            className={` ${
                status === "pending" ? "border border-black" : "bg-[#22AD5C]"
            } flex w-full flex-row items-center justify-center rounded-[0.635rem]  px-[0.5rem] py-[0.25rem]`}
            onClick={handleStatusChange}
        >
            <p
                className={`font-sans text-[0.9375rem] font-medium ${
                    status === "pending" ? "text-[#111928]" : "text-white"
                }`}
            >
                {status === "pending" ? "Đang chờ" : "Đã hoàn thành"}
            </p>
        </button>
    );
}
