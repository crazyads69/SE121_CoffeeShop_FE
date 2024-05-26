import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

interface CustomerNumResponse {
    [key: string]: number;
}

export interface CustomerNumData {
    label: string;
    value: number;
}

export default function useGetCustomerNum() {
    const [customerNum, setCustomerNum] = useState<CustomerNumData[]>([]);
    const [isLoadingCustomerNum, setIsLoadingCustomerNum] = useState<boolean>(false);
    const dispatch = useDispatch();

    const fetchCustomerNum = async (startDate: Date | null, endDate: Date | null) => {
        try {
            setIsLoadingCustomerNum(true);
            // Call API here
            const startDateUnix = startDate ? Math.floor(startDate.getTime() / 1000) : 1704088800; // 1/1/2024
            const endDateUnix = endDate ? Math.floor(endDate.getTime() / 1000) : 1735711200; // 1/1/2025
            const res = await axiosClient.get(
                `/dashboard/total-customer-by-time?start_date=${startDateUnix}&end_date=${endDateUnix}`,
            );
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                const customerNumData: CustomerNumData[] = [];
                const { data } = res;
                Object.entries(data).forEach(([key, value]) => {
                    const date = new Date(parseInt(key, 10) * 1000);
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    customerNumData.push({ label: dateString, value: value as number });
                });
                setCustomerNum(customerNumData);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Có lỗi khi lấy dữ liệu số lượng khách hàng");
            }
        } catch (error) {
            dispatch(setError("Có lỗi khi lấy dữ liệu số lượng khách hàng"));
        } finally {
            setIsLoadingCustomerNum(false);
        }
    };

    return { customerNum, isLoadingCustomerNum, fetchCustomerNum };
}
