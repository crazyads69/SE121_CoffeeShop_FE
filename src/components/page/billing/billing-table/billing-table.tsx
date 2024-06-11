/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetTotalIncome from "@/hooks/billing/useGetTotalIncome";
import { Invoice } from "@/redux/slices/invoice-slice";
import { convertIsoStringToDate, formatCurrency } from "@/utils/custom-functions/custom-functions";
import StatusDropdown from "@/components/page/billing/status-dropdown/status-dropdown";
import BillingDetail from "@/components/page/billing/billing-detail/billing-detail";
import TotalIncome from "@/components/page/billing/total-income/total-income";
import { RootState } from "@/redux/store";
import { USER_ROLE } from "@/utils/constant/constant";

export interface BillingTableProps {
    invoices: Invoice[];
}

export default function BillingTable({ invoices }: BillingTableProps) {
    // State for show detail of invoice
    const [showInvoiceDetail, setShowInvoiceDetail] = useState<boolean>(true);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const handleBillClick = (invoice: Invoice) => {
        // Only allow admin to view invoice detail
        if (user?.role !== USER_ROLE.ADMIN) return;
        setSelectedInvoice(invoice);
        setShowInvoiceDetail(true);
    };
    return (
        <div className="flex w-full flex-col items-center justify-center">
            {/** Header */}
            <div className="flex h-fit w-full flex-row items-center justify-between">
                <h1 className="font-sans text-[1.5rem] font-bold">Hoá đơn</h1>
                {user?.role === USER_ROLE.ADMIN && <TotalIncome />}
            </div>
            {/** Table */}
            {invoices.length === 0 ? (
                <h1> Không có hoá đơn nào được tìm thấy. Vui lòng thử lại với các bộ lọc khác.</h1>
            ) : (
                <div
                    className="relative mt-[0.94rem] w-full overflow-x-auto rounded-[0.625rem]
shadow-[0px_3px_8px_0px_rgba(0,0,0,0.08)]"
                >
                    <table className="w-full text-left rtl:text-right">
                        <thead className="h-[3.75rem] border-b border-[#EEE] bg-[#F9FAFB] font-sans text-[0.9375rem] font-normal text-[#111928]">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MÃ HOÁ ĐƠN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    THỜI GIAN ĐI
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    KHÁCH HÀNG
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    TỔNG TIỀN HÀNG
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    GIẢM GIÁ
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    TRẠNG THÁI
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product item */}
                            {invoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                >
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleBillClick(invoice);
                                        }}
                                    >
                                        {invoice.id}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleBillClick(invoice);
                                        }}
                                    >
                                        {convertIsoStringToDate(invoice.created_at)}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleBillClick(invoice);
                                        }}
                                    >
                                        {invoice.customer?.name === null ||
                                        invoice.customer?.name === undefined
                                            ? "Khách vãng lai"
                                            : invoice.customer?.name}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleBillClick(invoice);
                                        }}
                                    >
                                        {formatCurrency(invoice.total_price)}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleBillClick(invoice);
                                        }}
                                    >
                                        {formatCurrency(invoice.discount_price)}
                                    </td>
                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                        <StatusDropdown status={invoice.status} invoice={invoice} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showInvoiceDetail && selectedInvoice && (
                        <BillingDetail
                            invoice={selectedInvoice}
                            setShowInvoiceDetail={setShowInvoiceDetail}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
