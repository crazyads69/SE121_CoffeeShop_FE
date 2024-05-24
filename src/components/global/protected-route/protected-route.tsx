/* eslint-disable no-lonely-if */

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { loginSuccess, loadingSuccess } from "@/redux/slices/auth-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { USER_ROLE } from "@/utils/constant/constant";
import LoadingPage from "../loading/LoadingPage";
import useGetBankConfig from "@/hooks/auth/useGetBankConfig";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const prevPathname = useRef<string>(pathname);
    const user = useSelector((state: RootState) => state.auth.user);
    const { bankConfigValue, isLoadingBankConfig, fetchBankConfig } = useGetBankConfig();

    // Get user profile data
    const getProfile = async () => {
        try {
            const res = await axiosClient.get("/profile");
            if (res.status === 200) {
                dispatch(loginSuccess(res.data));
                localStorage.setItem("user", JSON.stringify(res.data));
                if (pathname === "/login") {
                    // Redirect to home page if user is already logged in
                    // If admin, redirect to admin page instead push to billing page
                    if (res.data.role === USER_ROLE.ADMIN) {
                        router.push("/admin");
                    } else {
                        router.push("/billing");
                    }
                } else {
                    // If pathname is / and user is admin, redirect to admin page
                    if (pathname === "/" && res.data.role === USER_ROLE.ADMIN) {
                        router.push("/admin");
                    } else if (pathname === "/" && res.data.role === USER_ROLE.USER) {
                        router.push("/billing");
                    } else {
                        // If not /, check if user is accessing admin page and is not admin
                        if (pathname.includes("/admin") && res.data.role !== USER_ROLE.ADMIN) {
                            router.push("/billing");
                        } else dispatch(loadingSuccess());
                    }
                }
            } else {
                throw new Error("Failed to get user profile");
            }
        } catch (error) {
            // If error, redirect to login page
            if (pathname === "/login") {
                dispatch(loadingSuccess());
            } else {
                router.push("/login");
            }
        }
    };

    // Get profile when component is mounted
    useLayoutEffect(() => {
        getProfile();
    }, []);

    // Perform check if the pathname is changed (user navigates to another page)
    useLayoutEffect(() => {
        // If user is authenticated and is admin, fetch bank config, do not fetch if pathname is /login
        if (isAuthenticated && user?.role === USER_ROLE.ADMIN && pathname !== "/login") {
            fetchBankConfig();
        }
        // Check if pathname is changed (different from previous pathname)
        if (pathname !== prevPathname.current) {
            if (pathname === "/" && isAuthenticated && user?.role === USER_ROLE.ADMIN) {
                router.push("/admin");
            } else if (pathname === "/" && isAuthenticated && user?.role === USER_ROLE.USER) {
                router.push("/billing");
            } else {
                // If pathname is /admin and user is not admin, redirect to billing page
                if (
                    pathname.includes("/admin") &&
                    isAuthenticated &&
                    user?.role !== USER_ROLE.ADMIN
                ) {
                    router.push("/billing");
                } else dispatch(loadingSuccess());
            }
        }
        // Update previous pathname
        prevPathname.current = pathname;
    }, [pathname, isAuthenticated, user]);
    // If isLoading is true, return Loading Page
    if (isLoading) {
        return <LoadingPage />;
    }
    return children;
}
