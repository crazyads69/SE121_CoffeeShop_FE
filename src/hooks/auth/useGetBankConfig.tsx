import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import path from "path";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { RootState } from "@/redux/store";
import { USER_ROLE } from "@/utils/constant/constant";
import { Bank, setBankConfig } from "@/redux/slices/auth-slice";

export default function useGetBankConfig() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const [bankConfigValue, setBankConfigValue] = useState<Bank | null>(null);
    const [isLoadingBankConfig, setIsLoadingBankConfig] = useState<boolean>(false);

    const fetchBankConfig = async () => {
        setIsLoadingBankConfig(true);
        try {
            const res = await axiosClient.get("/bank-config");
            if (res.status === 200) {
                setBankConfigValue(res.data);
                dispatch(setBankConfig(res.data));
                setIsLoadingBankConfig(false);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setIsLoadingBankConfig(false);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu cấu hình ngân hàng");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu cấu hình ngân hàng"));
            setIsLoadingBankConfig(false);
        }
    };

    return { bankConfigValue, isLoadingBankConfig, fetchBankConfig };
}
