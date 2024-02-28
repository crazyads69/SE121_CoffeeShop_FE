/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetBillingTotalPage from "./useGetBillingTotalPage";
import { Invoice } from "@/redux/slices/invoice-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { USER_ROLE } from "@/utils/constant/constant";

export default function useGetTotalIncome() {
    // Get total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // Check user role to call the right API (admin call /invoices API, staff call /invoices-pending API)
    const user = useSelector((state: RootState) => state.auth.user);
    let endPoint = "/invoices";

    if (user?.role === USER_ROLE.ADMIN) {
        endPoint = "/invoices";
    } else {
        endPoint = `/invoices-pending`;
    }

    // Get all invoices
    let total = 0;
    const { totalPage, fetchTotalPage } = useGetBillingTotalPage();
    // Get all invoices
    const getInvoices = async (page: number) => {
        total = 0;
        try {
            const res = await axiosClient.get(`${endPoint}?page=${page}`);
            if (res.status === 200) {
                res.data.data.forEach((invoice: Invoice) => {
                    total += invoice.final_price;
                });
                setTotalIncome(total);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchTotalPage();
            for (let i = 1; i <= totalPage; i += 1) {
                await getInvoices(i);
            }
        };
        fetchData();
    }, [totalPage, endPoint]);

    return totalIncome;
}
