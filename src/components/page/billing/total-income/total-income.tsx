import { formatCurrency } from "@/utils/custom-functions/custom-functions";

export interface TotalIncomeProps {
    totalIncome: number;
}

export default function TotalIncome({ totalIncome }: TotalIncomeProps) {
    return (
        <div className=" flex h-[2.93875rem] w-[11.375rem] flex-row items-center justify-between rounded-[0.625rem] bg-white px-[1rem] py-[0.75rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <p className="text-center font-sans text-[1rem]">
                Tổng thu: <span className="text-[#1C3FB7]">{formatCurrency(totalIncome)}</span>
            </p>
        </div>
    );
}
