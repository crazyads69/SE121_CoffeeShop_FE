import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setSuccess, setError } from "@/redux/slices/alert-slice";
import { Invoice, updateInvoice } from "@/redux/slices/invoice-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default async function PostInvoicePending(invoice: Invoice, dispatch: Dispatch<AnyAction>) {
    try {
        const res = await axiosClient.post(`/invoices-undo/${invoice.id}`);
        if (res.status === 200) {
            dispatch(
                updateInvoice({
                    ...invoice,
                    status: "pending",
                }),
            );
            dispatch(setSuccess("Cập nhật hóa đơn thành công"));
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Cập nhật hóa đơn thất bại");
        }
    } catch (error) {
        dispatch(setError("Cập nhật hóa đơn thất bại"));
    }
}
