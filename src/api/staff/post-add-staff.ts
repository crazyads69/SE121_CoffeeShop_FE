import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";

export default async function PostAddStaff(
    name: string,
    email: string,
    password: string,
    setShowAddStaffModal: (showAddStaffModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/staffs", {
            name,
            email,
            password,
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(setSuccess("Thêm nhân viên thành công"));
            setShowAddStaffModal(false);
            // Update staff list after add new staff after 3s
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi thêm nhân viên");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi thêm nhân viên"));
    }
}
