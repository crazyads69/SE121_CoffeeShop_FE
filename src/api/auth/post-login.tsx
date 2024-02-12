import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError } from "@/redux/slices/alertSlice";
import axiosClient from "@/utils/axiosClient/axiosClient";
import { USER_ROLE } from "@/utils/constant/constant";

export default async function PostLogin(
    email: string,
    password: string,
    router: AppRouterInstance,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/login", {
            email,
            password,
        });
        if (res.status === 200) {
            localStorage.setItem("ACCESS_TOKEN", res.data.token);
            // Check role to redirect
            if (res.data.user.role === USER_ROLE.ADMIN) {
                router.push("/admin");
            } else {
                router.push("/billing");
            }
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đăng nhập thất bại!");
        }
    } catch (error) {
        dispatch(setError("Đăng nhập thất bại!"));
    }
}
