"use client";

import RecentProfit from "@/components/page/admin/dashboard/recent-profit/recent-profit";
import CustomerNum from "@/components/page/admin/dashboard/customer-num/customer-num";
import TopProduct from "@/components/page/admin/dashboard/top-product/top-product";
import TodayResult from "@/components/page/admin/dashboard/today-result/today-result";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-start px-[4.13rem] pt-[1.87rem]">
            <TodayResult
                billCompleted={3}
                billCompletedAmount={100000}
                yesterdayBillCompletedAmount={200000}
                billServing={2}
                billServingAmount={50000}
                customer={5}
                yesterdayCustomer={3}
            />
            <RecentProfit />
            <TopProduct />
            <CustomerNum />
        </div>
    );
}
