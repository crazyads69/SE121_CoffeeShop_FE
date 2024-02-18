import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeStaffList, clearSelectedStaff } from "@/redux/slices/staff-slice";

export default async function DeleteStaffs(
    selectedStaffList: string[],
    setShowDeleteStaffModal: (showDeleteStaffModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/staffs/bulk-delete", {
            _method: "DELETE",
            ids: selectedStaffList,
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xoá nhân viên thành công"));
            dispatch(removeStaffList(selectedStaffList));
            dispatch(clearSelectedStaff());
            setShowDeleteStaffModal(false);
        } else {
            throw new Error("Xoá nhân viên thất bại");
        }
    } catch (error) {
        dispatch(setError("Xoá nhân viên thất bại"));
        setShowDeleteStaffModal(false);
    }
}
