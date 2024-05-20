import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { addLoyal } from "@/redux/slices/loyal-slice";

export default async function PostAddLoyal(
    loyalName: string,
    minSpend: number,
    loyalType: string,
    loyalAmount: number,
    setShowAddLoyalModal: (show: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/loyals", {
            name: loyalName,
            spending_min: minSpend,
            type: loyalType,
            amount: loyalAmount,
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(
                addLoyal({
                    id: res.data.id,
                    name: res.data.name,
                    spending_min: res.data.spending_min,
                    type: res.data.type,
                    amount: res.data.amount,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                }),
            );
            setShowAddLoyalModal(false);
            dispatch(setSuccess("Thêm mức thành viên thành công"));
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi thêm mức thành viên");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi thêm mức thành viên"));
    }
}
