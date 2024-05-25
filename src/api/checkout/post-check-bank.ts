import { AnyAction, Dispatch } from "redux";
import axiosClient from "@/utils/axios-client/axios-client";
import { setSuccess } from "@/redux/slices/alert-slice";

export default async function PostCheckBank(
    checkoutId: string,
    amount: string,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        // Call API to verify bank
        const res = await axiosClient.post("/invoices/check-bank", {
            random_code: checkoutId,
            amount,
        });
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            // Handle success
            return res.data.isSuccess;
        }
        if (res.data.message) {
            // Handle error
            throw new Error(res.data.message);
        } else {
            throw new Error("Không thể xác thực ngân hàng");
        }
    } catch (error) {
        // Handle error
        return false;
    }
}
