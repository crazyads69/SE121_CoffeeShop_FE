import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessage, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { Voucher, setVouchers } from "@/redux/slices/voucher-slice";

export default function useGetVoucherList() {
    const [isLoadingVoucherList, setIsLoadingVoucherList] = useState<boolean>(false);
    const [voucherList, setVoucherList] = useState<Voucher[]>([]);
    const dispatch = useDispatch();

    const fetchVoucherList = async (page: number) => {
        setIsLoadingVoucherList(true);
        try {
            const res = await axiosClient.get(`/vouchers?page=${page}`);
            if (res.status === 200) {
                setVoucherList(res.data.data);
                dispatch(setVouchers(res.data.data));
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu voucher");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu voucher"));
        } finally {
            setIsLoadingVoucherList(false);
        }
    };

    return { isLoadingVoucherList, voucherList, fetchVoucherList };
}
