"use client";

import RecentProfit from "@/components/page/admin/dashboard/recent-profit/recent-profit";
import CustomerNum from "@/components/page/admin/dashboard/customer-num/customer-num";
import TopProduct from "@/components/page/admin/dashboard/top-product/top-product";
import TodayResult from "@/components/page/admin/dashboard/today-result/today-result";
import useGetTodayResult from "@/hooks/dashboard/useGetTodayResult";

export default function Page() {
    const { todayResult, isLoadingTodayResult, fetchTodayResult } = useGetTodayResult();
    return (
        <div className="flex h-full w-full flex-col items-center justify-start px-[4.13rem] pt-[1.87rem]">
            <TodayResult todayResult={todayResult} />
            <RecentProfit />
            <TopProduct />
            <CustomerNum />
        </div>
    );
}
