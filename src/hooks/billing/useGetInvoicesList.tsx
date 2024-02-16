import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Invoice, setInvoices } from "@/redux/slices/invoice-slice";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

export default function useGetInvoicesList() {
    const [isLoadingInvoices, setIsLoadingInvoices] = useState<boolean>(false);
    const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
    const dispatch = useDispatch();

    // Fetch invoices list
    const fetchInvoicesList = async (page: number) => {
        setIsLoadingInvoices(true);
        try {
            const res = await axiosClient.get(`/invoices?page=${page}`);
            if (res.status === 200) {
                dispatch(setInvoices(res.data.data));
                setInvoiceList(res.data.data);
                setIsLoadingInvoices(false);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setIsLoadingInvoices(false);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu hóa đơn");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu hóa đơn"));
        } finally {
            setIsLoadingInvoices(false);
        }
    };

    // Fetch pending invoices list
    const fetchPendingInvoicesList = async (page: number) => {
        setIsLoadingInvoices(true);
        try {
            const res = await axiosClient.get(`/invoices-pending?page=${page}`);
            if (res.status === 200) {
                dispatch(setInvoices(res.data.data));
                setInvoiceList(res.data.data);
                setIsLoadingInvoices(false);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
                setIsLoadingInvoices(false);
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu hóa đơn");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu hóa đơn"));
        } finally {
            setIsLoadingInvoices(false);
        }
    };

    return { isLoadingInvoices, invoiceList, fetchInvoicesList, fetchPendingInvoicesList };
}
