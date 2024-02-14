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

// Define default metric and time range
const defaultMetric = ["sales", "revenue"];
const defaultTimeRange = [
    {
        label: "7 ngày qua",
        value: "week",
    },
    {
        label: "1 tháng qua",
        value: "month",
    },
    {
        label: "3 tháng qua",
        value: "quarter",
    },
    {
        label: "1 năm qua",
        value: "year",
    },
];

export default function TopProduct() {
    const [selectedMetric, setSelectedMetric] = useState<string>("");
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");
    // State for show or hide metric filter dropdown metric
    const [showMetricFilter, setShowMetricFilter] = useState<boolean>(false);
    // State for show or hide time range filter dropdown
    const [showTimeRangeFilter, setShowTimeRangeFilter] = useState<boolean>(false);
    const metricRef = useRef<HTMLDivElement>(null);
    const timeRangeRef = useRef<HTMLDivElement>(null);
    // Handle click outside of metric filter dropdown
    const handleClickOutsideMetricFilter = (event: MouseEvent) => {
        if (metricRef.current && !metricRef.current.contains(event.target as Node)) {
            setShowMetricFilter(false);
        }
    };
    // Handle click outside of time range filter dropdown
    const handleClickOutsideTimeRangeFilter = (event: MouseEvent) => {
        if (timeRangeRef.current && !timeRangeRef.current.contains(event.target as Node)) {
            setShowTimeRangeFilter(false);
        }
    };
    // Add event listener to handle click outside of metric filter dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMetricFilter);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMetricFilter);
        };
    }, [metricRef]);
    // Add event listener to handle click outside of time range filter dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideTimeRangeFilter);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideTimeRangeFilter);
        };
    }, [timeRangeRef]);
    // Set default metric and time range when component is mounted
    useEffect(() => {
        // Default is sales
        setSelectedMetric(defaultMetric[0]);
        // Default is day
        setSelectedTimeRange(defaultTimeRange[0].value);
    }, []);
    // Map label with selectedTimeRange
    const timeRangeLabel = defaultTimeRange.find(
        (timeRange) => timeRange.value === selectedTimeRange,
    )?.label;
    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value as "sales" | "revenue");
    };

    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeRange(event.target.value as "week" | "month" | "quarter" | "year");
    };

    const topProducts = generateTopProductsData(selectedMetric);

    const topProductsData = {
        labels: topProducts.labels,
        datasets: [
            {
                label: selectedMetric === "sales" ? "Doanh thu" : "Số lượng",
                data: topProducts.data,
                backgroundColor: "#3758F9",
                barThickness: 55,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 100,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    callback: (value: any) => {
                        if (selectedMetric === "sales") {
                            if (value < 1000) return `${value}k`;
                            return `${value / 1000}tr`;
                        }
                        return value;
                    },
                },
            },
            y: {
                max: 1000,
                ticks: {
                    beginAtZero: true,
                    stepSize: 100,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    callback: (value: any, index: number) => {
                        if (selectedMetric === "sales") {
                            return topProducts.labels[index];
                        }
                        if (selectedMetric === "revenue") {
                            return topProducts.labels[index];
                        }
                        return value;
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
        indexAxis: "y" as const,
        type: "horizontalBar",
    };

    return (
        <div className="mt-[0.89rem] flex min-h-fit w-full flex-col justify-start rounded-[0.625rem] bg-white pb-[2.06rem] pl-[4.94rem] pr-[3.68rem] pt-[1.69rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {/* <div className="mb-3 flex items-center">
                <div className="top-products-header mr-3 select-none font-sans text-[1.5rem] font-bold">
                    Top Sản Phẩm Của Cửa Hàng
                </div>
                <div className="mr-10" /> {}
                <select
                    value={selectedMetric}
                    onChange={handleMetricChange}
                    style={{
                        padding: '8px',
                        backgroundColor: '#f4f4f4',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                        fontSize: '16px',
                        color: '#005B6F',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginRight: '10px',
                    }}
                >
                    <option value="sales">Theo Số Lượng Bán</option>
                    <option value="revenue">Theo Doanh Thu</option>
                </select>
                <div className="mr-10" /> {}
                <select
                    value={selectedTimeRange}
                    onChange={handleTimeRangeChange}
                    style={{
                        padding: '8px',
                        backgroundColor: '#f4f4f4',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                        fontSize: '16px',
                        color: '#005B6F',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <option value="week">7 Ngày Qua</option>
                    <option value="month">1 Tháng Qua</option>
                    <option value="quarter">3 Tháng Qua</option>
                    <option value="year">1 Năm Qua</option>
                </select>
            </div> */}
            {/** Chart title and filter option */}
            <div className="flex w-full flex-row items-center justify-between">
                {/** Chart title */}
                <div className="flex flex-row items-center justify-start">
                    <h1 className="font-sans text-[1.5rem] font-bold">
                        TOP 10 HÀNG HOÁ BÁN CHẠY 10 NGÀY QUA
                    </h1>
                    {/** Chart metric filter option */}
                    <div className="relative">
                        <div
                            className="ml-[1rem] flex h-[3rem] w-[13.3125rem] cursor-pointer select-none flex-row items-center justify-between rounded-md border border-[#DFE4EA] px-[1.25rem] py-[0.75rem] hover:bg-gray-200"
                            onClick={() => {
                                setShowMetricFilter(!showMetricFilter);
                            }}
                        >
                            {/** Metric filter label */}
                            {selectedMetric === "sales" ? (
                                <p className="font-sans text-[1rem] font-bold text-[#005B6F]">
                                    THEO DOANH THU
                                </p>
                            ) : (
                                <p className="font-sans text-[1rem] font-bold text-[#005B6F] ">
                                    THEO SỐ LƯỢNG
                                </p>
                            )}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                            >
                                <path
                                    d="M1.41444 1.03563L1.41443 1.03565L1.41725 1.0384L6.76725 6.2634L7.00126 6.49194L7.23418 6.26229L12.5842 0.987287L12.5842 0.987293L12.5858 0.985629C12.6807 0.890803 12.8196 0.890804 12.9144 0.985629C13.009 1.08017 13.0093 1.21858 12.9153 1.31338C12.915 1.31366 12.9147 1.31394 12.9144 1.31422L7.16652 6.96217L7.16651 6.96216L7.16444 6.96422C7.06813 7.06053 7.02327 7.06659 7.00015 7.06659C6.94122 7.06659 6.89018 7.05216 6.8204 6.99903L1.08502 1.36339C0.991024 1.26859 0.991301 1.13018 1.08585 1.03563C1.18067 0.940804 1.31962 0.940804 1.41444 1.03563Z"
                                    fill="#637381"
                                    stroke="#637381"
                                    strokeWidth="0.666667"
                                />
                            </svg>
                        </div>
                        {/** Metric filter dropdown */}
                        {showMetricFilter && (
                            <div
                                ref={metricRef}
                                className="absolute left-4 top-[3.5rem] flex min-h-fit w-[13.3125rem] flex-col items-center justify-start overflow-hidden rounded-md bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                            >
                                {/** Metric filter option */}
                                {defaultMetric.map((metric) => (
                                    <button
                                        type="button"
                                        key={metric}
                                        className="w-full px-[0.5rem] py-[1.25rem] font-sans font-bold hover:bg-gray-200"
                                        onClick={() => {
                                            setSelectedMetric(metric);
                                            setShowMetricFilter(false);
                                        }}
                                    >
                                        {metric === "sales" ? "THEO DOANH THU" : "THEO SỐ LƯỢNG"}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/** Chart time range filter option */}
                <div className="relative">
                    <div
                        className="flex h-[3rem] w-[8.875rem] cursor-pointer select-none flex-row items-center justify-between rounded-md border border-[#DFE4EA] py-[0.75rem] pl-[1.25rem] pr-[0.75rem] hover:bg-gray-200"
                        onClick={() => {
                            setShowTimeRangeFilter(!showTimeRangeFilter);
                        }}
                    >
                        {/** Time range filter label */}
                        <p className="font-sans text-[1rem] font-bold text-[#005B6F]">
                            {timeRangeLabel}
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                        >
                            <path
                                d="M1.41444 1.03575L1.41443 1.03577L1.41725 1.03852L6.76725 6.26352L7.00126 6.49206L7.23418 6.26241L12.5842 0.987409L12.5842 0.987415L12.5858 0.985751C12.6807 0.890925 12.8196 0.890926 12.9144 0.985751C13.009 1.0803 13.0093 1.2187 12.9153 1.31351C12.915 1.31379 12.9147 1.31407 12.9144 1.31435L7.16652 6.96229L7.16651 6.96228L7.16444 6.96435C7.06813 7.06065 7.02327 7.06671 7.00015 7.06671C6.94122 7.06671 6.89018 7.05228 6.8204 6.99915L1.08502 1.36351C0.991024 1.26871 0.991301 1.1303 1.08585 1.03575C1.18067 0.940926 1.31962 0.940926 1.41444 1.03575Z"
                                fill="#637381"
                                stroke="#637381"
                                strokeWidth="0.666667"
                            />
                        </svg>
                    </div>
                    {/** Time range filter dropdown */}
                    {showTimeRangeFilter && (
                        <div
                            ref={timeRangeRef}
                            className="absolute left-0 top-[3.5rem] flex min-h-fit w-[8.875rem] flex-col items-center justify-start overflow-hidden rounded-md bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                        >
                            {/** Time range filter option */}
                            {defaultTimeRange.map((timeRange) => (
                                <button
                                    type="button"
                                    key={timeRange.value}
                                    className="w-full px-[0.5rem] py-[1.25rem] font-sans font-bold hover:bg-gray-200"
                                    onClick={() => {
                                        setSelectedTimeRange(timeRange.value);
                                        setShowTimeRangeFilter(false);
                                    }}
                                >
                                    {timeRange.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Bar
                options={options}
                data={topProductsData}
                className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
            />
        </div>
    );
}
