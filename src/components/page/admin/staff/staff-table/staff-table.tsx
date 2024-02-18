/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import { Staff } from "@/redux/slices/staff-slice";
import SelectAllStaff from "../select-staff/select-all-staff";
import SelectStaff from "../select-staff/select-staff";
import StaffDetail from "../staff-detail/staff-detail";

export interface StaffTableProps {
    staffs: Staff[];
}

export default function StaffTable({ staffs }: StaffTableProps) {
    const [showStaffDetail, setShowStaffDetail] = useState<boolean>(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    const handleShowStaffDetail = (staff: Staff) => {
        setSelectedStaff(staff);
        setShowStaffDetail(true);
    };
    return (
        <div className="flex w-full flex-col">
            {/* Product table */}
            {staffs.length === 0 ? (
                <h1 className="text-center ">
                    Không có nhân viên nào được tìm thấy, vui lòng thử lại với các bộc lọc khác
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
                                    <SelectAllStaff />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    MÃ NHÂN VIÊN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    TÊN NHÂN VIÊN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                >
                                    EMAIL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product item */}
                            {staffs.map((staff) => (
                                <tr
                                    key={staff.id}
                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                >
                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                        <SelectStaff staffCode={String(staff.id)} />
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowStaffDetail(staff);
                                        }}
                                    >
                                        {staff.id}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowStaffDetail(staff);
                                        }}
                                    >
                                        {staff.name}
                                    </td>
                                    <td
                                        className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium"
                                        onClick={() => {
                                            handleShowStaffDetail(staff);
                                        }}
                                    >
                                        {staff.email}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showStaffDetail === true && (
                        <StaffDetail
                            setShowStaffDetail={setShowStaffDetail}
                            staff={selectedStaff as Staff}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
