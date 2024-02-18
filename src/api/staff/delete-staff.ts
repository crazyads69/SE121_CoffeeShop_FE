import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeSelectedStaff, removeStaff } from "@/redux/slices/staff-slice";

export default async function DeleteStaff(
    staffID: number,
    setShowDeleteStaffModal: (showDeleteStaffModal: boolean) => void,
    setShowStaffDetail: (showStaffDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/staffs/${staffID}`, {
            _method: "DELETE",
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xoá nhân viên thành công"));
            dispatch(removeStaff(String(staffID)));
            dispatch(removeSelectedStaff(String(staffID)));
            setShowDeleteStaffModal(false);
            setShowStaffDetail(false);
        } else {
            throw new Error("Xoá nhân viên thất bại");
        }
    } catch (error) {
        dispatch(setError("Xoá nhân viên thất bại"));
        setShowDeleteStaffModal(false);
    }
}
