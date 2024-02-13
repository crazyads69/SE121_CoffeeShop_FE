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

export const options = {
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
            max: 1000,
            ticks: {
                beginAtZero: true,
                stepSize: 100,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                callback: (value: any) => {
                    if (value < 1000) return `${value} k`;
                    return `${value / 100} M`;
                },
            },
        },
    },
};

const generateLastSevenDays = () => {
    const today = new Date();
    const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - index);
        // get date in format dd/mm/yyyy
        const formattedDate = pastDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        // convert date from mm/dd/yyyy to format dd/mm/yyyy
        const [month, day, year] = formattedDate.split("/");
        return `${day}/${month}/${year}`;
    });

    return lastSevenDays.reverse();
};

const labels = generateLastSevenDays();

// TODO: add data
const generateDataForLastSevenDays = () => {
    return labels.map(() => Math.floor(Math.random() * 1000));
};

export const data = {
    labels,
    datasets: [
        {
            label: "Doanh thu",
            data: generateDataForLastSevenDays(),
            backgroundColor: "#3758F9",
            barThickness: 55,
        },
    ],
};

export default function RecentProfit() {
    return (
        <div className="mt-[0.89rem] flex h-fit w-full flex-col justify-start rounded-md bg-white py-[1.56rem] px-[5.06rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h1 className="select-none font-sans text-[1.5rem] font-bold">Doanh thu 7 ngày qua</h1>
            <Bar
                options={options}
                data={data}
                className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
            />
        </div>
    );
}
