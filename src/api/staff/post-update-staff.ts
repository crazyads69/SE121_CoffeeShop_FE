import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { Staff, updateStaff } from "@/redux/slices/staff-slice";

export default async function PostUpdateStaff(
    staff_id: number,
    name: string,
    email: string,
    password: string,
    rePassword: string,
    staff: Staff,
    setShowUpdateStaffModal: (showUpdateStaffModal: boolean) => void,
    setShowStaffDetail: (showStaffDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/staffs/${staff_id}`, {
            _method: "PUT",
            name,
            email,
            password,
            password_confirmation: rePassword,
        });
        if (res.status === 200 || res.status === 201) {
            dispatch(
                updateStaff({
                    ...staff,
                    name,
                    email,
                }),
            );
            setShowUpdateStaffModal(false);
            setShowStaffDetail(false);
            dispatch(setSuccess("Cập nhật nhân viên thành công"));
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Cập nhật nhân viên thất bại");
        }
    } catch (error) {
        dispatch(setError("Cập nhật nhân viên thất bại"));
    }
}
