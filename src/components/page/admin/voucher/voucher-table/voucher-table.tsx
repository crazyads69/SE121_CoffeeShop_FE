/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Voucher } from "@/redux/slices/voucher-slice";
import { RootState } from "@/redux/store";
import AddVoucherItem from "../add-voucher/add-voucher";
import DeleteVoucherList from "../delete-voucher/delete-voucher-list";
import SelectAllVoucher from "../select-voucher/select-all-voucher";
import SelectVoucher from "../select-voucher/select-voucher";
import VoucherDetail from "../voucher-detail/voucher-detail";
import { formatCurrency } from "@/utils/custom-functions/custom-functions";

export interface VoucherTableProps {
    vouchers: Voucher[];
}

export default function VoucherTable({ vouchers }: VoucherTableProps) {
    // State for hold selected voucher list in table
    const selectedVoucherList = useSelector((state: RootState) => state.voucher.selectedVoucher);
    // State for track which product is selected to show detail
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    // State for show product detail modal
    const [showVoucherDetail, setShowVoucherDetail] = useState<boolean>(false);
    // State for show delete selected product modal
    const [showDeleteVoucherModal, setShowDeleteVoucherModal] = useState<boolean>(false);
    // State for show add product modal
    const [showAddVoucherModal, setShowAddVoucherModal] = useState<boolean>(false);
    // // Disable scroll when modal is open to prevent user from scrolling background
    // useEffect(() => {
    //     if (showProductDetail || showDeleteProductModal || showAddProductModal) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // }, [showProductDetail, showDeleteProductModal, showAddProductModal]);
    // Check for selected product list change to render product list and delete product list button
    useEffect(() => {
        if (selectedVoucherList.length === 0) {
            setShowDeleteVoucherModal(false);
        }
    }, [selectedVoucherList]);
    // Render product list when filter product list change
    // Format product price to currency format: 1000000 => 1.000.000
    // const formatCurrency = (price: number) => {
    //     return new Intl.NumberFormat("en-US").format(price);
    // };
    const handleVoucherClick = (voucher: Voucher) => {
        setShowVoucherDetail(true);
        setSelectedVoucher(voucher);
    };

    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-sans text-[1.5rem] font-bold">Voucher</h1>
                <div className="flex flex-row items-center">
                    {/* Xoá hàng hoá */}
                    {/** Only render delete product button if selectedProduct is not empty */}
                    {selectedVoucherList.length > 0 && (
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-[#E10E0E] px-[1.5rem]
                    py-[0.75rem]"
                            onClick={() => {
                                setShowDeleteVoucherModal(true);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#DFE4EA"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="ml-[0.5rem] font-sans text-[1rem] font-medium text-white">
                                Xoá voucher
                            </p>
                        </button>
                    )}
                    {/* Thêm hàng hoá */}
                    <button
                        type="button"
                        className="ml-[1.25rem] inline-flex items-center rounded-md bg-[#1C3FB7]
                    px-[1.5rem] py-[0.75rem]"
                        onClick={() => {
                            setShowAddVoucherModal(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#DFE4EA"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <p className="ml-[0.5rem] font-sans text-[1rem] font-medium text-white">
                            Thêm mới
                        </p>
                    </button>
                </div>
            </div>
            {/* Product table */}
            {vouchers.length === 0 ? (
                <h1 className="text-center">
                    Không có voucher nào được tìm thấy, vui lòng thử lại với các bộ lọc khác{" "}
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
                                    <SelectAllVoucher />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MÃ VOUCHER
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    TÊN VOUCHER
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    LOẠI VOUCHER
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MỨC GIẢM GIÁ
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    SỐ LƯỢNG
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product item */}
                            {vouchers.map((voucher) => (
                                <tr
                                    key={voucher.id}
                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                >
                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                        <SelectVoucher voucherCode={String(voucher.id)} />
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleVoucherClick(voucher)}
                                    >
                                        {voucher.id}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleVoucherClick(voucher)}
                                    >
                                        {voucher.voucher_code.toUpperCase()}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleVoucherClick(voucher)}
                                    >
                                        {voucher.type === "direct" ? "Giảm tiền" : "Giảm phần trăm"}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleVoucherClick(voucher)}
                                    >
                                        {voucher.type === "direct"
                                            ? `${formatCurrency(voucher.amount)}đ`
                                            : `${voucher.amount}%`}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleVoucherClick(voucher)}
                                    >
                                        {voucher.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showVoucherDetail === true && (
                        <VoucherDetail
                            setShowVoucherDetail={setShowVoucherDetail}
                            voucher={selectedVoucher as Voucher}
                        />
                    )}

                    {showDeleteVoucherModal === true && (
                        <DeleteVoucherList
                            setShowDeleteVoucherModal={setShowDeleteVoucherModal}
                            showDeleteVoucherModal={showDeleteVoucherModal}
                        />
                    )}
                </div>
            )}
            {showAddVoucherModal === true && (
                <AddVoucherItem setShowAddVoucherModal={setShowAddVoucherModal} />
            )}
        </div>
    );
}
