/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import useGetRecentProfit from "@/hooks/dashboard/useGetRecentProfit";
import "react-datepicker/dist/react-datepicker.css";
import { ranges } from "@/utils/constant/constant";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RecentProfit() {
    const [selectedRange, setSelectedRange] = useState(ranges[0].value);
    const [startDate, setStartDate] = useState(ranges[0].startDate);
    const [endDate, setEndDate] = useState(ranges[0].endDate);
    const { recentProfit, isLoadingRecentProfit, fetchRecentProfit } = useGetRecentProfit();

    // Handle change selected range
    useEffect(() => {
        if (selectedRange !== "other") {
            const selectedRangeObj = ranges.find((range) => range.value === selectedRange);
            if (selectedRangeObj) {
                setStartDate(selectedRangeObj.startDate);
                setEndDate(selectedRangeObj.endDate);
            }
        }
    }, [selectedRange]);
    useEffect(() => {
        fetchRecentProfit(startDate, endDate);
    }, [startDate, endDate]);
    const handleStepSize = (max: number) => {
        if (max < 1000) return 100;
        if (max < 10000) return 1000;
        if (max < 100000) return 10000;
        if (max < 1000000) return 100000;
        if (max < 10000000) return 1000000;
        if (max < 100000000) return 10000000;
        if (max < 1000000000) return 100000000;
        return 1000000000;
    };
    return (
        <div className="mt-[0.89rem] flex h-fit w-full flex-col justify-start rounded-md bg-white py-[1.56rem] px-[5.06rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row justify-between w-full">
                <h1 className="select-none font-sans text-[1.5rem] font-bold">
                    Doanh thu{" "}
                    {selectedRange === "other"
                        ? "Khác"
                        : ranges.find((range) => range.value === selectedRange)?.label}
                </h1>
                <div className="flex flex-row items-center">
                    {/* Dropdown */}
                    <select
                        defaultValue={selectedRange}
                        onChange={(e) => setSelectedRange(e.target.value)}
                        className="ml-[1rem] flex h-[3rem] w-fit ring-0 outline-none cursor-pointer select-none flex-row items-center justify-between rounded-md border border-[#DFE4EA] px-[1.25rem] py-[0.75rem] font-sans text-[1rem] font-bold text-[#005B6F] hover:bg-gray-200"
                    >
                        {ranges.map((range) => (
                            <option key={range.id} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                    {selectedRange === "other" && (
                        <>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                locale="vi"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Từ ngày"
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                showMonthDropdown
                                showYearDropdown
                                className="ml-[1rem] cursor-pointer border border-[#DFE4EA] px-[1.25rem] py-[0.75rem] font-sans text-[1rem] font-bold text-[#005B6F] hover:bg-gray-200"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                showMonthDropdown
                                showYearDropdown
                                locale="vi"
                                placeholderText="Đến ngày"
                                dateFormat="dd/MM/yyyy"
                                className="ml-[1rem] cursor-pointer border border-[#DFE4EA] px-[1.25rem] py-[0.75rem] font-sans text-[1rem] font-bold text-[#005B6F] hover:bg-gray-200"
                            />
                        </>
                    )}
                </div>
            </div>
            <Bar
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom" as const,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            max: recentProfit.reduce(
                                (max, item) => (item.value > max ? item.value : max),
                                0,
                            ),
                            ticks: {
                                stepSize: handleStepSize(
                                    recentProfit.reduce(
                                        (max, item) => (item.value > max ? item.value : max),
                                        0,
                                    ),
                                ),
                                callback: (value: number | string) => {
                                    const numValue = Number(value);
                                    if (numValue >= 100000 && numValue < 1000000)
                                        return `${numValue / 1000} nghìn`;
                                    if (numValue >= 1000000 && numValue < 1000000000)
                                        return `${numValue / 1000000} triệu`;
                                    if (numValue >= 1000000000)
                                        return `${numValue / 1000000000} tỷ`;
                                    return value.toString();
                                },
                            },
                        },
                    },
                }}
                data={{
                    labels: recentProfit.map((item) => item.label),
                    datasets: [
                        {
                            label: "Doanh thu",
                            data: recentProfit.map((item) => item.value),
                            backgroundColor: "#3758F9",
                            barThickness: 55,
                        },
                    ],
                }}
                className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
            />
        </div>
    );
}
