import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { Customer } from "@/redux/slices/invoice-slice";
import { setCustomers } from "@/redux/slices/customer-slice";

export default function useGetCustomerList() {
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [isLoadingCustomerList, setIsLoadingCustomerList] = useState<boolean>(false);
    const dispatch = useDispatch();
    const fetchCustomers = async (page: number) => {
        setIsLoadingCustomerList(true);
        try {
            const res = await axiosClient.get(`/customers?page=${page}`);
            if (res.status === 200) {
                setCustomerList(res.data.data);
                dispatch(setCustomers(res.data.data));
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu khách hàng");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu khách hàng"));
        } finally {
            setIsLoadingCustomerList(false);
        }
    };
    return { customerList, isLoadingCustomerList, fetchCustomers };
}
