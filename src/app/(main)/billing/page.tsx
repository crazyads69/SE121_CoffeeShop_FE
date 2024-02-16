/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */

"use client";

import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/global/loading/LoadingPage";
import Pagination from "@/components/global/pagination/pagination";
import BillingTable from "@/components/page/billing/billing-table/billing-table";
import SearchBilling from "@/components/page/billing/search-billing/search-billing";
import StatusFilter from "@/components/page/billing/status-filter/status-filter";
import TimeFilter from "@/components/page/billing/time-filter/time-filter";
import useGetBillingTotalPage from "@/hooks/billing/useGetBillingTotalPage";
import useGetInvoicesList from "@/hooks/billing/useGetInvoicesList";
import { Invoice } from "@/redux/slices/invoice-slice";
import { RootState } from "@/redux/store";
import { USER_ROLE } from "@/utils/constant/constant";
import fuzzyMatch, { filterByTimeRange } from "@/utils/custom-functions/custom-functions";

export default function Page() {
    const { isLoadingInvoices, invoiceList, fetchInvoicesList, fetchPendingInvoicesList } =
        useGetInvoicesList();
    const { totalPage, fetchTotalPage } = useGetBillingTotalPage();
    const [searchBillID, setSearchBillID] = useState<string>("");
    const [searchCustomerID, setSearchCustomerID] = useState<string>("");
    const [selectedDateRange, setSelectedDateRange] = useState<string>("allTime");
    const [selectedStatus, setSelectedStatus] = useState<string>("allStatus");
    const [activePage, setActivePage] = useState<number>(1);
    const [filterBillList, setFilterBillList] = useState<Invoice[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);
    const invoices = useSelector((state: RootState) => state.invoice.invoices);
    useEffect(() => {
        if (user?.role === USER_ROLE.ADMIN) {
            fetchInvoicesList(activePage);
        } else {
            fetchPendingInvoicesList(activePage);
        }
    }, [user, activePage]);
    // Filter invoices by bill id
    const filterByBillID = (invoices: Invoice[], searchBillID: string) => {
        return invoices.filter((invoice) => {
            return (
                fuzzyMatch(searchBillID, String(invoice.id)) ||
                fuzzyMatch(String(invoice.id), searchBillID)
            );
        });
    };
    // Filter invoices by customer id or customer name
    const filterByCustomerID = (invoices: Invoice[], searchCustomerID: string) => {
        return invoices.filter((invoice) => {
            if (invoice.customer) {
                return (
                    fuzzyMatch(searchCustomerID, String(invoice.customer_id)) ||
                    fuzzyMatch(String(invoice.customer_id), searchCustomerID) ||
                    fuzzyMatch(searchCustomerID, invoice.customer.name) ||
                    fuzzyMatch(invoice.customer.name, searchCustomerID)
                );
            }
            return true;
        });
    };
    // Filter invoices by date range
    const filterByDateRange = (invoices: Invoice[], selectedDateRange: string) => {
        return filterByTimeRange(invoices, selectedDateRange);
    };
    // Filter invoices by status
    const filterByStatus = (invoices: Invoice[], selectedStatus: string) => {
        return invoices.filter((invoice) => {
            if (selectedStatus === "allStatus") return true;
            return invoice.status === selectedStatus;
        });
    };
    useEffect(() => {
        let newFilterList = invoices;
        newFilterList = filterByBillID(newFilterList, searchBillID);
        newFilterList = filterByCustomerID(newFilterList, searchCustomerID);
        newFilterList = filterByDateRange(newFilterList, selectedDateRange);
        newFilterList = filterByStatus(newFilterList, selectedStatus);
        setFilterBillList(newFilterList);
    }, [searchBillID, searchCustomerID, selectedDateRange, selectedStatus, invoices]);

    return (
        <>
            {isLoadingInvoices ? (
                <LoadingPage />
            ) : (
                <div className="flex w-full h-full flex-row items-start justify-between pb-[2.5rem] pl-[4.81rem] pr-[5.94rem] pt-[1.56rem]">
                    <div className="flex w-[13.625rem] flex-col items-start justify-center">
                        <SearchBilling
                            searchBillID={searchBillID}
                            setSearchBillID={setSearchBillID}
                            searchCustomerID={searchCustomerID}
                            setSearchCustomerID={setSearchCustomerID}
                        />
                        <TimeFilter
                            selectedDateRange={selectedDateRange}
                            setSelectedDateRange={setSelectedDateRange}
                        />
                        {/** Only show status filter when user role is 1 */}
                        {user?.role === 1 && (
                            <StatusFilter
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                            />
                        )}
                    </div>
                    <div className="ml-[1.56rem] flex w-full flex-col items-center justify-center">
                        <BillingTable invoices={filterBillList} />
                        {totalPage > 1 && (
                            <Pagination
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
