import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default async function PostLogout(router: AppRouterInstance, dispatch: Dispatch<AnyAction>) {
    try {
        const res = await axiosClient.post("/logout");
        if (res.status === 204) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("user");
            localStorage.removeItem("chat");
            router.push("/login");
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đăng xuất thất bại!");
        }
    } catch (error) {
        dispatch(setError("Đăng xuất thất bại!"));
    }
}
