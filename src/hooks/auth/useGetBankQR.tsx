import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export default function useGetBankQR() {
    const [bankQR, setBankQR] = useState<string>("");
    const bankConfig = useSelector((state: RootState) => state.auth.bankConfig);
    const dispatch = useDispatch();
    const [isLoadingQR, setIsLoadingQR] = useState<boolean>(false);

    const fetchBankQR = async () => {
        try {
            setIsLoadingQR(true);
            const res = await axiosClient.get("/bank-config-test");
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                setBankQR(res.data.qr);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Lấy QR code thất bại");
            }
        } catch (error) {
            dispatch(setError("Lấy QR code thất bại"));
        } finally {
            setIsLoadingQR(false);
        }
    };

    return { bankQR, fetchBankQR, isLoadingQR };
}
