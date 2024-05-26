/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ranges } from "@/utils/constant/constant";
import useGetCustomerNum from "@/hooks/dashboard/useGetCustomerNum";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CustomerNum() {
    const [selectedRange, setSelectedRange] = useState(ranges[0].value);
    const [startDate, setStartDate] = useState(ranges[0].startDate);
    const [endDate, setEndDate] = useState(ranges[0].endDate);
    const { customerNum, isLoadingCustomerNum, fetchCustomerNum } = useGetCustomerNum();
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
        fetchCustomerNum(startDate, endDate);
    }, [startDate, endDate]);
    return (
        <div className="mt-[0.89rem] mb-[2rem] flex h-fit w-full flex-col justify-start rounded-md bg-white px-[5.06rem] py-[1.63rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row items-center justify-start">
                <h1 className="select-none font-sans text-[1.5rem] font-bold">
                    SỐ LƯỢNG KHÁCH HÀNG {selectedRange === "other" ? "TỪ" : "TRONG"}
                    {/* <span className="text-1.5rem font-extrabold text-blue-900">
                        {` ${sum(filterData(data, selectedOption))}`}
                    </span> */}
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

            <Line
                className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                            text: "",
                        },
                    },
                }}
                data={{
                    labels: customerNum.map((item) => item.label),
                    datasets: [
                        {
                            label: "Số lượng khách hàng",
                            data: customerNum.map((item) => item.value),
                            borderColor: "blue",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                }}
            />
        </div>
    );
}
