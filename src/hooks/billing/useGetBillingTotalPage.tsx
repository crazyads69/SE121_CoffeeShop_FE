import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import path from "path";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { RootState } from "@/redux/store";
import { USER_ROLE } from "@/utils/constant/constant";

export default function useGetBillingTotalPage() {
    const [totalPage, setTotalPage] = useState<number>(1);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    let endPoint = "/invoices";

    if (user?.role === USER_ROLE.ADMIN) {
        endPoint = "/invoices";
    } else {
        endPoint = `/invoices-pending`;
    }

    const fetchTotalPage = async () => {
        try {
            const res = await axiosClient.get(endPoint);
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
    return { totalPage, fetchTotalPage };
}
