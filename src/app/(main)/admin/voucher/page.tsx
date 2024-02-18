/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Voucher } from "@/redux/slices/voucher-slice";
import useGetVoucherList from "@/hooks/voucher/useGetVoucherList";
import useGetVoucherTotalPage from "@/hooks/voucher/useGetVoucherTotalPage";
import fuzzyMatch from "@/utils/custom-functions/custom-functions";
import LoadingPage from "@/components/global/loading/LoadingPage";
import Pagination from "@/components/global/pagination/pagination";
import SearchVoucher from "@/components/page/admin/voucher/search-voucher/search-voucher";
import VoucherTable from "@/components/page/admin/voucher/voucher-table/voucher-table";
import VoucherType from "@/components/page/admin/voucher/voucher-type/voucher-type";

export default function Page() {
    const { isLoadingVoucherList, voucherList, fetchVoucherList } = useGetVoucherList();
    // State for hold search value
    const [searchValue, setSearchValue] = useState<string>("");
    const [activePage, setActivePage] = useState<number>(1);
    const { totalPage, fetchTotalPage } = useGetVoucherTotalPage();
    // State for hold selected voucher type
    const [selectedVoucherType, setSelectedVoucherType] = useState<string>("");
    // State for filter voucher list
    const [filteredVoucherList, setFilteredVoucherList] = useState<Voucher[]>([]);
    const vouchers = useSelector((state: RootState) => state.voucher.vouchers);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchTotalPage();
        fetchVoucherList(activePage);
    }, [activePage]);

    // filter voucher list by search value
    const filterVoucherBySearchValue = (vouchers: Voucher[], searchValue: string) => {
        return vouchers.filter((voucher) => {
            return (
                fuzzyMatch(searchValue, voucher.voucher_code) ||
                fuzzyMatch(voucher.voucher_code, searchValue) ||
                fuzzyMatch(searchValue, String(voucher.id)) ||
                fuzzyMatch(String(voucher.id), searchValue)
            );
        });
    };

    const filterVoucherByType = (vouchers: Voucher[], type: string) => {
        return vouchers.filter((voucher) => {
            return voucher.type === type;
        });
    };
    // Filter voucher list when search value, or selected voucher type change
    useEffect(() => {
        let newFilteredVoucherList = vouchers;
        if (searchValue) {
            newFilteredVoucherList = filterVoucherBySearchValue(
                newFilteredVoucherList,
                searchValue,
            );
        }
        if (selectedVoucherType) {
            newFilteredVoucherList = filterVoucherByType(
                newFilteredVoucherList,
                selectedVoucherType,
            );
        }
        setFilteredVoucherList(newFilteredVoucherList);
    }, [searchValue, selectedVoucherType, vouchers]);
    return (
        <>
            {isLoadingVoucherList ? (
                <LoadingPage />
            ) : (
                <div className="flex w-full h-full flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchVoucher searchValue={searchValue} setSearchValue={setSearchValue} />
                        <VoucherType
                            selectedVoucherType={selectedVoucherType}
                            setSelectedVoucherType={setSelectedVoucherType}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <VoucherTable vouchers={filteredVoucherList} />
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
