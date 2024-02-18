/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

"use client";

import { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Staff } from "@/redux/slices/staff-slice";
import useGetStaffList from "@/hooks/staff/useGetStaffList";
import useGetStaffTotalPage from "@/hooks/staff/useGetStaffTotalPage";
import fuzzyMatch from "@/utils/custom-functions/custom-functions";
import LoadingPage from "@/components/global/loading/LoadingPage";
import Pagination from "@/components/global/pagination/pagination";
import AddStaff from "@/components/page/admin/staff/add-staff/add-staff";
import DeleteStaffList from "@/components/page/admin/staff/delete-staff/delete-staff-list";
import SearchStaff from "@/components/page/admin/staff/search-staff/search-staff";
import StaffTable from "@/components/page/admin/staff/staff-table/staff-table";

export default function Page() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [showDeleteStaffModal, setShowDeleteStaffModal] = useState<boolean>(false);
    const [showAddStaffModal, setShowAddStaffModal] = useState<boolean>(false);
    const { totalPage, fetchTotalPage } = useGetStaffTotalPage();
    const [activePage, setActivePage] = useState<number>(1);
    const { isLoadingStaffList, staffList, fetchStaffList } = useGetStaffList();
    const [filterStaffList, setFilterStaffList] = useState<Staff[]>([]);
    const staffs = useSelector((state: RootState) => state.staff.staffs);
    const selectedStaffList = useSelector((state: RootState) => state.staff.selectedStaff);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTotalPage();
        fetchStaffList(activePage);
    }, [activePage]);

    const filterBySearchValue = (staffList: Staff[], searchValue: string) => {
        return staffList.filter((staff) => {
            return (
                fuzzyMatch(staff.name, searchValue) ||
                fuzzyMatch(searchValue, staff.name) ||
                fuzzyMatch(String(staff.id), searchValue) ||
                fuzzyMatch(searchValue, String(staff.id))
            );
        });
    };
    // Filter staff list by search value and set to filterStaffList
    useEffect(() => {
        let filteredStaffList = staffs;

        filteredStaffList = filterBySearchValue(staffs, searchValue);

        setFilterStaffList(filteredStaffList);
    }, [searchValue, staffs]);

    return (
        <>
            {isLoadingStaffList ? (
                <LoadingPage />
            ) : (
                <div className="flex w-full h-full flex-col items-start justify-start pl-[3.56rem] pr-[4.63rem] pt-[0.81rem]">
                    <div className="flex w-full flex-row items-center justify-between">
                        <h1 className="font-sans text-[1.5rem] font-bold">Nhân viên</h1>
                        <div className="flex flex-row items-center justify-start">
                            <div className="flex flex-row items-center justify-between">
                                {selectedStaffList.length > 0 && (
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-[#E10E0E] px-[1.5rem]
                    py-[0.75rem]"
                                        onClick={() => {
                                            setShowDeleteStaffModal(true);
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
                                            Xoá nhân viên
                                        </p>
                                    </button>
                                )}
                                {/* Thêm hàng hoá */}
                                <button
                                    type="button"
                                    className="ml-[1.25rem] inline-flex items-center rounded-md bg-[#1C3FB7]
                    px-[1.5rem] py-[0.75rem]"
                                    onClick={() => {
                                        setShowAddStaffModal(true);
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
                                <SearchStaff
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </div>

                            {/* Delete Button and Add New Staff */}
                        </div>
                    </div>
                    <div className="mt-[1rem] flex w-full flex-col items-center justify-start">
                        {/* Table */}
                        <StaffTable staffs={filterStaffList} />
                        {totalPage > 1 && (
                            <Pagination
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                    {showDeleteStaffModal && (
                        <DeleteStaffList
                            setShowDeleteStaffModal={setShowDeleteStaffModal}
                            showDeleteStaffModal={showDeleteStaffModal}
                        />
                    )}
                    {showAddStaffModal && <AddStaff setShowAddStaffModal={setShowAddStaffModal} />}
                </div>
            )}
        </>
    );
}
