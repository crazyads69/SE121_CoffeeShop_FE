import { Dispatch } from "react";
import { AnyAction } from "redux";
import axiosClient from "@/utils/axios-client/axios-client";
import { setSuccess, setError } from "@/redux/slices/alert-slice";
import { removeAllSelectedLoyals, removeLoyalList } from "@/redux/slices/loyal-slice";

export default async function DeleteLoyals(
    selectedLoyalList: string[],
    setShowDeleteLoyalModal: (showDeleteLoyalModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/loyals/bulk-delete", {
            _method: "DELETE",
            ids: selectedLoyalList,
        });
        if (res.status === 204 || res.status === 200 || res.status === 201) {
            dispatch(setSuccess("Xoá mức thành viên thành công"));
            dispatch(removeAllSelectedLoyals());
            dispatch(removeLoyalList(selectedLoyalList));
            setShowDeleteLoyalModal(false);
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
