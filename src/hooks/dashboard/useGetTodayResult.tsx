import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export interface TodayResultData {
    total_income_today: number;
    total_income_yesterday: number;
    total_invoice_today: number;
    total_invoice_yesterday: number;
    total_income_pending: number;
    total_customer_today: number;
    total_customer_yesterday: number;
}

export default function useGetTodayResult() {
    const [todayResult, setTodayResult] = useState<TodayResultData>({
        total_income_today: 0,
        total_income_yesterday: 0,
        total_invoice_today: 0,
        total_invoice_yesterday: 0,
        total_income_pending: 0,
        total_customer_today: 0,
        total_customer_yesterday: 0,
    });
    const [isLoadingTodayResult, setIsLoadingTodayResult] = useState<boolean>(false);
    const dispatch = useDispatch();

    const fetchTodayResult = async () => {
        try {
            setIsLoadingTodayResult(true);
            const res = await axiosClient.get("/dashboard/summary-statistic-today");
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                setTodayResult(res.data);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Có lỗi khi lấy dữ liệu thống kê hôm nay");
            }
        } catch (error) {
            dispatch(setError("Có lỗi khi lấy dữ liệu thống kê hôm nay"));
        } finally {
            setIsLoadingTodayResult(false);
        }
    };

    // Auto fetch today result when component mounted
    useEffect(() => {
        fetchTodayResult();
    }, []);

    return { todayResult, isLoadingTodayResult, fetchTodayResult };
}
