/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { use, useEffect, useState } from "react";
import { Customer } from "@/redux/slices/customer-slice";
import SelectAllCustomer from "@/components/page/admin/customer/select-customer/select-all-customer";
import SelectCustomer from "@/components/page/admin/customer/select-customer/select-customer";
import CustomerDetail from "@/components/page/admin/customer/customer-detail/customer-detail";

export interface CustomerTableProps {
    customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
    const [showCustomerDetail, setShowCustomerDetail] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const handleShowCustomerDetail = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowCustomerDetail(true);
    };
    return (
        <div className="flex w-full flex-col">
            {/* Product table */}
            {customers.length === 0 ? (
                <h1 className="text-center">
                    Không có khách hàng nào được tìm thấy. Vui lòng thử lại với các bộ lọc khác.
                </h1>
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
                                    <SelectAllCustomer />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MÃ KHÁCH HÀNG
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    TÊN KHÁCH HÀNG
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    SỐ ĐIỆN THOẠI
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product item */}
                            {customers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                >
                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                        <SelectCustomer customerCode={String(customer.id)} />
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowCustomerDetail(customer);
                                        }}
                                    >
                                        {customer.id}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowCustomerDetail(customer);
                                        }}
                                    >
                                        {customer.name}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowCustomerDetail(customer);
                                        }}
                                    >
                                        {customer.phone_number}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showCustomerDetail === true && (
                        <CustomerDetail
                            customer={selectedCustomer as Customer}
                            setShowCustomerDetail={setShowCustomerDetail}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
