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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Item {
    id: number;
    date: string;
    user: number;
}

interface CustomerProps {}

interface LineChartProps {
    chart_data: Item[];
}

function LineChart({ chart_data }: LineChartProps) {
    const options = {
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
    };

    const labels = chart_data.map((item: Item) => item.date);
    const data_values = chart_data.map((item: Item) => item.user);

    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: data_values,
                borderColor: "blue",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <Line
            className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
            options={options}
            data={data}
        />
    );
}

export default function CustomerNum(props: CustomerProps) {
    const [selectedOption, setSelectedOption] = useState("7days");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch("https://65547e2463cafc694fe68a2e.mockapi.io/custom")
            .then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const sum = (data: Item[]) => data.map((item) => item.user).reduce((acc, num) => acc + num, 0);

    const filterData = (data: Item[], flag: string): Item[] => {
        const lastIndex = flag === "7days" ? 7 : 30;
        const filteredData = data.slice(-lastIndex); // Use slice to get the last 7 or 30 items based on flag

        return filteredData;
    };
    return (
        <div className="mt-[0.89rem] mb-[2rem] flex h-fit w-full flex-col justify-start rounded-md bg-white px-[5.06rem] py-[1.63rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row items-center justify-start">
                <h1 className="select-none font-sans text-[1.5rem] font-bold">
                    SỐ LƯỢNG KHÁCH HÀNG TRONG
                    {`${selectedOption}` === "30days" ? <span> 30 </span> : <span> 7 </span>}
                    NGÀY GẦN NHẤT:{` `}
                    <span className="text-1.5rem font-extrabold text-blue-900">
                        {` ${sum(filterData(data, selectedOption))}`}
                    </span>
                </h1>
                <div className="relative">
                    <select
                        className="ml-[1rem] flex h-[3rem] w-[13.3125rem] cursor-pointer select-none flex-row items-center justify-between rounded-md border border-[#DFE4EA] px-[1.25rem] py-[0.75rem] font-sans text-[1rem] font-bold text-[#005B6F] hover:bg-gray-200"
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value="7days">7 ngày qua</option>
                        <option value="30days">30 ngày qua</option>
                    </select>
                </div>
            </div>

            <div>
                {filterData(data, selectedOption) ? (
                    <LineChart chart_data={filterData(data, selectedOption)} />
                ) : null}
            </div>
        </div>
    );
}
