import { useState } from "react";
import { useDispatch } from "react-redux";

import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default function useGetBillingTotalPage() {
    const [totalPage, setTotalPage] = useState<number>(1);
    const dispatch = useDispatch();

    const fetchTotalPage = async () => {
        try {
            const res = await axiosClient.get("/invoices");
            if (res.status === 200) {
                setTotalPage(res.data.last_page);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalPage(1);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu hóa đơn");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu hóa đơn"));
            setTotalPage(1);
        }
    };

    const fetchPendingTotalPage = async () => {
        try {
            const res = await axiosClient.get("/invoices-pending");
            if (res.status === 200) {
                setTotalPage(res.data.last_page);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalPage(1);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu hóa đơn");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu hóa đơn"));
            setTotalPage(1);
        }
    };

    return { totalPage, fetchTotalPage, fetchPendingTotalPage };
}
