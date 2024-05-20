import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Loyal, updateLoyal } from "@/redux/slices/loyal-slice";
import { setSuccess, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default async function PostUpdateLoyal(
    id: string,
    loyalName: string,
    minSpend: number,
    loyalType: string,
    loyalAmount: number,
    loyal: Loyal,
    setShowUpdateLoyalModal: (show: boolean) => void,
    setShowLoyalDetail: (show: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/loyals/${id}`, {
            name: loyalName,
            spending_min: minSpend,
            type: loyalType,
            amount: loyalAmount,
            _method: "PUT",
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(updateLoyal(res.data));
            dispatch(setSuccess("Cập nhật mức thành viên thành công"));
            setShowUpdateLoyalModal(false);
            setShowLoyalDetail(false);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi cập nhật mức thành viên");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi cập nhật mức thành viên"));
    }
}
