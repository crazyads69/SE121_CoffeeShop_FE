import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { log } from "console";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { updateBankConfig } from "@/redux/slices/auth-slice";

export default async function PostBankConfig(
    bankId: string,
    bankNumber: string,
    bankAccountName: string,
    setShowBankUpdateModal: (showBankUpdateModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_BANK_API_KEY;
        const res = await axiosClient.post("/bank-config", {
            bank_id: bankId,
            bank_number: bankNumber,
            bank_account_name: bankAccountName,
            api_key: apiKey,
        });
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            dispatch(updateBankConfig(res.data));
            dispatch(setSuccess("Cấu hình ngân hàng thành công"));
            setShowBankUpdateModal(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Cấu hình ngân hàng thất bại");
        }
    } catch (error) {
        dispatch(setError("Cấu hình ngân hàng thất bại"));
    }
}
