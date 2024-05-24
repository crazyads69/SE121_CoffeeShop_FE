/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loyal } from "@/redux/slices/loyal-slice";
import { formatCurrency } from "@/utils/custom-functions/custom-functions";
import SelectVoucher from "../../voucher/select-voucher/select-voucher";
import SelectAllLoyal from "../select-loyal/select-all-loyal";
import LoyalDetail from "../loyal-detail/loyal-detail";
import DeleteLoyalList from "../delete-loyal/delete-loyal-list";
import AddLoyalItem from "../add-loyal/add-loyal";
import SelectLoyal from "../select-loyal/select-loyal";

export interface LoyalTableProps {
    loyals: Loyal[];
}
export default function LoyalTable({ loyals }: LoyalTableProps) {
    // State for hold selected voucher list in table
    const selectedLoyalList = useSelector((state: RootState) => state.loyal.selectedLoyal);
    // State for track which product is selected to show detail
    const [selectedLoyal, setSelectedLoyal] = useState<Loyal | null>(null);
    // State for show product detail modal
    const [showLoyalDetail, setShowLoyalDetail] = useState<boolean>(false);
    // State for show delete selected product modal
    const [showDeleteLoyalModal, setShowDeleteLoyalModal] = useState<boolean>(false);
    // State for show add product modal
    const [showAddLoyalModal, setShowAddLoyalModal] = useState<boolean>(false);
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
        if (selectedLoyalList.length === 0) {
            setShowDeleteLoyalModal(false);
        }
    }, [selectedLoyalList]);
    // Render product list when filter product list change
    // Format product price to currency format: 1000000 => 1.000.000
    // const formatCurrency = (price: number) => {
    //     return new Intl.NumberFormat("en-US").format(price);
    // };
    const handleLoyalClick = (loyal: Loyal) => {
        setShowLoyalDetail(true);
        setSelectedLoyal(loyal);
    };

    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-sans text-[1.5rem] font-bold">Mức thành viên</h1>
                <div className="flex flex-row items-center">
                    {/* Xoá hàng hoá */}
                    {/** Only render delete product button if selectedProduct is not empty */}
                    {selectedLoyalList.length > 0 && (
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-[#E10E0E] px-[1.5rem]
                    py-[0.75rem]"
                            onClick={() => {
                                setShowDeleteLoyalModal(true);
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
                                Xoá mức giảm giá
                            </p>
                        </button>
                    )}
                    {/* Thêm hàng hoá */}
                    <button
                        type="button"
                        className="ml-[1.25rem] inline-flex items-center rounded-md bg-[#1C3FB7]
                    px-[1.5rem] py-[0.75rem]"
                        onClick={() => {
                            setShowAddLoyalModal(true);
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
            {loyals.length === 0 ? (
                <h1 className="text-center">
                    Không có mức giảm giá nào được tìm thấy, vui lòng thử lại với các bộ lọc khác{" "}
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
                                    <SelectAllLoyal />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MÃ MỨC GIẢM GIÁ
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MỨC THÀNH VIÊN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    LOẠI GIẢM GIÁ
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MỨC GIẢM GIÁ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product item */}
                            {loyals.map((loyal) => (
                                <tr
                                    key={loyal.id}
                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                >
                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                        <SelectLoyal loyalCode={String(loyal.id)} />
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleLoyalClick(loyal)}
                                    >
                                        {loyal.id}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleLoyalClick(loyal)}
                                    >
                                        {loyal.name}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleLoyalClick(loyal)}
                                    >
                                        {loyal.type === "direct" ? "Giảm tiền" : "Giảm phần trăm"}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => handleLoyalClick(loyal)}
                                    >
                                        {loyal.type === "direct"
                                            ? `${formatCurrency(loyal.amount)}đ`
                                            : `${loyal.amount}%`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showLoyalDetail === true && (
                        <LoyalDetail
                            setShowLoyalDetail={setShowLoyalDetail}
                            loyal={selectedLoyal as Loyal}
                        />
                    )}

                    {showDeleteLoyalModal === true && (
                        <DeleteLoyalList
                            setShowDeleteLoyalModal={setShowDeleteLoyalModal}
                            showDeleteLoyalModal={showDeleteLoyalModal}
                        />
                    )}
                </div>
            )}
            {showAddLoyalModal === true && (
                <AddLoyalItem setShowAddLoyalModal={setShowAddLoyalModal} />
            )}
        </div>
    );
}
