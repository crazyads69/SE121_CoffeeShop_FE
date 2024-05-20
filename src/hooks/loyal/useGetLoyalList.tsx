import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "@/utils/axios-client/axios-client";
import { Loyal, setLoyals } from "@/redux/slices/loyal-slice";
import { setError } from "@/redux/slices/alert-slice";

export default function useGetLoyalList() {
    const [loyalList, setLoyalList] = useState<Loyal[]>([]);
    const [isLoadingLoyalList, setIsLoadingLoyalList] = useState<boolean>(false);
    const dispatch = useDispatch();
    const fetchLoyals = async (page: number) => {
        setIsLoadingLoyalList(true);
        try {
            const res = await axiosClient.get(`/loyals?page=${page}`);
            if (res.status === 200) {
                setLoyalList(res.data.data);
                dispatch(setLoyals(res.data.data));
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu thành viên");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu thành viên"));
        } finally {
            setIsLoadingLoyalList(false);
        }
    };
    return { loyalList, isLoadingLoyalList, fetchLoyals };
}
