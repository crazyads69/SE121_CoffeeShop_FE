/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingPage from "@/components/global/loading/LoadingPage";
import Pagination from "@/components/global/pagination/pagination";
import useGetLoyalList from "@/hooks/loyal/useGetLoyalList";
import useGetVoucherTotalPage from "@/hooks/voucher/useGetVoucherTotalPage";
import fuzzyMatch from "@/utils/custom-functions/custom-functions";
import { Loyal } from "@/redux/slices/loyal-slice";
import SearchLoyal from "@/components/page/admin/loyal/search-loyal/search-loyal";
import LoyalType from "@/components/page/admin/loyal/loyal-type/loyal-type";
import LoyalTable from "@/components/page/admin/loyal/loyal-table/loyal-table";

export default function Page() {
    const { isLoadingLoyalList, loyalList, fetchLoyals } = useGetLoyalList();
    // State for hold search value
    const [searchValue, setSearchValue] = useState<string>("");
    const [activePage, setActivePage] = useState<number>(1);
    const { totalPage, fetchTotalPage } = useGetVoucherTotalPage();
    // State for hold selected voucher type
    const [selectedLoyalType, setSelectedLoyalType] = useState<string>("");
    // State for filter voucher list
    const [filteredLoyalList, setFilteredLoyalList] = useState<Loyal[]>([]);
    const loyals = useSelector((state: RootState) => state.loyal.loyals);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchTotalPage();
        fetchLoyals(activePage);
    }, [activePage]);

    // filter voucher list by search value
    const filterLoyalBySearchValue = (loyals: Loyal[], searchValue: string) => {
        return loyals.filter((loyal) => {
            return (
                fuzzyMatch(searchValue, String(loyal.id)) ||
                fuzzyMatch(String(loyal.id), searchValue) ||
                fuzzyMatch(searchValue, loyal.name) ||
                fuzzyMatch(loyal.name, searchValue)
            );
        });
    };

    const filterLoyalByType = (loyals: Loyal[], type: string) => {
        return loyals.filter((loyal) => {
            return loyal.type === type;
        });
    };
    // Filter voucher list when search value, or selected voucher type change
    useEffect(() => {
        let newFilteredLoyalList = loyals;
        if (searchValue) {
            newFilteredLoyalList = filterLoyalBySearchValue(newFilteredLoyalList, searchValue);
        }
        if (selectedLoyalType) {
            newFilteredLoyalList = filterLoyalByType(newFilteredLoyalList, selectedLoyalType);
        }
        setFilteredLoyalList(newFilteredLoyalList);
    }, [searchValue, selectedLoyalType, loyals]);
    return (
        <>
            {isLoadingLoyalList ? (
                <LoadingPage />
            ) : (
                <div className="flex w-full h-full flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchLoyal searchValue={searchValue} setSearchValue={setSearchValue} />
                        <LoyalType
                            selectedLoyalType={selectedLoyalType}
                            setSelectedLoyalType={setSelectedLoyalType}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <LoyalTable loyals={filteredLoyalList} />
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
