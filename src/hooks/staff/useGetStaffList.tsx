import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessage, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { Staff, setStaffs } from "@/redux/slices/staff-slice";

export default function useGetStaffList() {
    const [isLoadingStaffList, setIsLoadingStaffList] = useState<boolean>(false);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const dispatch = useDispatch();

    const fetchStaffList = async (page: number) => {
        setIsLoadingStaffList(true);
        try {
            const res = await axiosClient.get(`/staffs?page=${page}`);
            if (res.status === 200) {
                setStaffList(res.data.data);
                dispatch(setStaffs(res.data.data));
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu nhân viên");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu nhân viên"));
        } finally {
            setIsLoadingStaffList(false);
        }
    };

    return { isLoadingStaffList, staffList, fetchStaffList };
}
