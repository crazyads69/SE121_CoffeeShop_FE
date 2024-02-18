import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default function useGetVoucherTotalPage() {
    const [totalPage, setTotalPage] = useState<number>(0);
    const dispatch = useDispatch();
    const fetchTotalPage = async () => {
        try {
            const res = await axiosClient.get("/vouchers");
            if (res.status === 200) {
                setTotalPage(res.data.last_page);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalPage(1);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu voucher");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu voucher"));
            setTotalPage(1);
        }
    };
    return { totalPage, fetchTotalPage };
}
