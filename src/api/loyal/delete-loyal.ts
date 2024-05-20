import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeLoyal, removeSelectedLoyal } from "@/redux/slices/loyal-slice";

export default async function DeleteLoyal(
    loyalCode: string,
    setShowDeleteLoyalModal: (showDeleteLoyalModal: boolean) => void,
    setShowLoyalDetail: (showLoyalDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/loyals/${loyalCode}`, {
            _method: "DELETE",
        });
        if (res.status === 204 || res.status === 200 || res.status === 201) {
            dispatch(setSuccess("Xoá mức thành viên thành công"));
            // Remove selected loyal from redux store
            dispatch(removeSelectedLoyal(Number(loyalCode)));
            dispatch(removeLoyal(Number(loyalCode)));
            setShowDeleteLoyalModal(false);
            setShowLoyalDetail(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            setShowDeleteLoyalModal(false);
        } else {
            throw new Error("Có lỗi xảy ra khi xoá mức thành viên");
        }
    } catch (error) {
        dispatch(setError("Có lỗi xảy ra khi xoá mức thành viên"));
        setShowDeleteLoyalModal(false);
    }
}
