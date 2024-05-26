import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export interface RecentProfitData {
    label: string;
    value: number;
}

interface RecentProfitResponse {
    [key: string]: number;
}

export default function useGetRecentProfit() {
    const [recentProfit, setRecentProfit] = useState<RecentProfitData[]>([]);
    const [isLoadingRecentProfit, setIsLoadingRecentProfit] = useState<boolean>(false);
    const dispatch = useDispatch();
    const fetchRecentProfit = async (startDate: Date | null, endDate: Date | null) => {
        try {
            setIsLoadingRecentProfit(true);
            // Call API here
            const startDateUnix = startDate ? Math.floor(startDate.getTime() / 1000) : 1704088800; // 1/1/2024
            const endDateUnix = endDate ? Math.floor(endDate.getTime() / 1000) : 1735711200; // 1/1/2025
            const res = await axiosClient.get(
                `/dashboard/income-by-time?start_date=${startDateUnix}&end_date=${endDateUnix}`,
            );
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                const recentProfitData: RecentProfitData[] = [];
                const { data } = res;
                Object.entries(data).forEach(([key, value]) => {
                    // Convert label from timestamp to date string
                    const date = new Date(parseInt(key, 10) * 1000);
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    recentProfitData.push({ label: dateString, value: value as number });
                });
                setRecentProfit(recentProfitData);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Có lỗi khi lấy dữ liệu lợi nhuận gần đây");
            }
        } catch (error) {
            dispatch(setError("Có lỗi khi lấy dữ liệu lợi nhuận gần đây"));
        } finally {
            setIsLoadingRecentProfit(false);
        }
    };

    return { recentProfit, isLoadingRecentProfit, fetchRecentProfit };
}
