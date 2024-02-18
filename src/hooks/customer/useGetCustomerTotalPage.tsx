import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default function useGetCustomerTotalPage() {
    const [totalPage, setTotalPage] = useState<number>(0);
    const dispatch = useDispatch();
    const fetchTotalPage = async () => {
        try {
            const res = await axiosClient.get("/customers");
            if (res.status === 200) {
                setTotalPage(res.data.last_page);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalPage(1);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu khách hàng");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu khách hàng"));
            setTotalPage(1);
        }
    };
    return { totalPage, fetchTotalPage };
}
