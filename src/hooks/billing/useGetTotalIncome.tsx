/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import { useState } from "react";
import { useDispatch } from "react-redux";

import axiosClient from "@/utils/axios-client/axios-client";

import { setError } from "@/redux/slices/alert-slice";

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const dispatch = useDispatch();

    // Get total income
    const fetchTotalIncome = async () => {
        try {
            const res = await axiosClient.get("/invoices/total-income");
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                setTotalIncome(res.data.total_income);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalIncome(0);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu hóa đơn");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu hóa đơn"));
            setTotalIncome(0);
        }
    };
    return { totalIncome, fetchTotalIncome };
}
