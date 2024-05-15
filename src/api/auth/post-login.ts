import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { log } from "console";
import { clearMessage, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { USER_ROLE } from "@/utils/constant/constant";
import { loginSuccess } from "@/redux/slices/auth-slice";

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
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // Update state in redux after login success
            dispatch(loginSuccess(res.data.user));
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
