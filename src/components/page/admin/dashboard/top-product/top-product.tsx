/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { ranges } from "@/utils/constant/constant";
import "react-datepicker/dist/react-datepicker.css";
import useGetTopProduct from "@/hooks/dashboard/useGetTopProduct";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopProduct {
    productName: string;
    sales: number;
    revenue: number;
}
// Generate dummy data for top products chart
const generateTopProductsData = (selectedMetric: string): { labels: string[]; data: number[] } => {
    const topProductsData: TopProduct[] = [
        { productName: "Trà sữa kem trứng cháy", sales: 1200, revenue: 2400 },
        { productName: "Trà lài", sales: 750, revenue: 1500 },
        { productName: "Cà phê muối", sales: 453, revenue: 1257 },
        { productName: "Trà đào", sales: 500, revenue: 1400 },
        { productName: "Matcha đá xay", sales: 275, revenue: 1700 },
    ];
    // Map the data to labels and data arrays for chart rendering (x-axis and y-axis)
    const labels = topProductsData.map((product) => product.productName);
    const data = topProductsData.map((product) =>
        selectedMetric === "sales" ? product.sales : product.revenue,
    );

    return { labels, data };
};

export default function TopProduct() {
    const [selectedRange, setSelectedRange] = useState(ranges[0].value);
    const [startDate, setStartDate] = useState(ranges[0].startDate);
    const [endDate, setEndDate] = useState(ranges[0].endDate);
    const { topProducts, isLoadingTopProduct, fetchTopProduct } = useGetTopProduct();
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
        fetchTopProduct(startDate, endDate);
    }, [startDate, endDate]);

    function handleStepSize(maxValue: number) {
        let stepSize = 1; // default value
        if (maxValue > 10) {
            stepSize = 10;
        } else if (maxValue > 100) {
            stepSize = 100;
        } else if (maxValue > 1000) {
            stepSize = 1000;
        } else if (maxValue > 10000) {
            stepSize = 10000;
        } else if (maxValue > 100000) {
            stepSize = 100000;
        } else if (maxValue > 1000000) {
            stepSize = 1000000;
        } else if (maxValue > 10000000) {
            stepSize = 10000000;
        } else if (maxValue > 100000000) {
            stepSize = 100000000;
        } else if (maxValue > 1000000000) {
            stepSize = 1000000000;
        }
        return stepSize;
    }

    return (
        <div className="mt-[0.89rem] flex min-h-fit w-full flex-col justify-start rounded-[0.625rem] bg-white pb-[2.06rem] pl-[4.94rem] pr-[3.68rem] pt-[1.69rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {/** Chart title and filter option */}
            <div className="flex w-full flex-row items-center justify-between">
                {/** Chart title */}
                <div className="flex flex-row items-center justify-start w-full">
                    <h1 className="font-sans text-[1.5rem] font-bold">
                        TOP 10 HÀNG HOÁ BÁN CHẠY {selectedRange === "other" ? "TỪ" : "TRONG"}
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
                {/** Chart time range filter option */}
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
                            beginAtZero: true,
                            grid: {
                                display: true,
                            },
                            ticks: {
                                stepSize: handleStepSize(
                                    Math.max(...topProducts.map((product) => product.value)),
                                ),
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                callback: (value: any) => {
                                    return value;
                                },
                            },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                    indexAxis: "y" as const,
                }}
                data={{
                    labels: topProducts.map((product) => product.label),
                    datasets: [
                        {
                            label: "Số lượng",
                            data: topProducts.map((product) => product.value),
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
