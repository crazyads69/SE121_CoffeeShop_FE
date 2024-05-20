import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export default function useGetLoyalTotalPage() {
    const [totalPage, setTotalPage] = useState<number>(0);
    const dispatch = useDispatch();
    const fetchTotalPage = async () => {
        try {
            const res = await axiosClient.get("/loyals");
            if (res.status === 200) {
                setTotalPage(res.data.last_page);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setTotalPage(1);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu thành viên");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu thành viên"));
            setTotalPage(1);
        }
    };
    return { totalPage, fetchTotalPage };
}
