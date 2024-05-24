import { Dispatch } from "react";
import { AnyAction } from "redux";
import { setSuccess, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { updateCustomerPhone } from "@/redux/slices/checkout-slice";

export default async function PostLoyalVerify(phone: string, dispatch: Dispatch<AnyAction>) {
    try {
        // Call API to verify loyal customer
        const res = await axiosClient.post("/loyals-verify", { customer_phone_number: phone });
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            // Handle success
            dispatch(setSuccess("Xác thực khách hàng thành công"));
            dispatch(updateCustomerPhone(phone));
        } else if (res.data.message) {
            // Handle error
            dispatch(setError(res.data.message));
            dispatch(updateCustomerPhone(phone));
        } else {
            throw new Error("Không thể xác thực khách hàng");
        }
    } catch (error) {
        // Handle error
        dispatch(setError("Không thể xác thực khách hàng"));
        dispatch(updateCustomerPhone(phone));
    }
}
