/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { dateRange } from "@/utils/constant/constant";

export interface TimeFilterProps {
    selectedDateRange: string;
    setSelectedDateRange: (selectedDateRange: string) => void;
}

export default function TimeFilter({ selectedDateRange, setSelectedDateRange }: TimeFilterProps) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    return (
        <div className="relative">
            <div className="mt-[1.19rem] flex h-[6.75rem] w-[13.625rem] flex-col items-start rounded-md bg-white pb-[1.94rem] pl-[0.74rem] pr-[1.25rem] pt-[0.56rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <label className="select-none font-sans text-[1rem] font-bold" htmlFor="filter">
                    Thời điểm
                </label>
                {/** Time range filter button */}
                <div
                    role="button"
                    className="mt-[0.5rem] flex h-[2.25rem] w-full cursor-pointer select-none flex-row items-center justify-between rounded-md border border-[#DFE4EA] px-[1em] py-[0.5rem] hover:bg-gray-200"
                    onClick={() => {
                        setShowPopup(!showPopup);
                    }}
                >
                    <p className="font-sans text-[1rem]">
                        {selectedDateRange === "allTime"
                            ? "Chọn thời điểm"
                            : dateRange[selectedDateRange]}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                    >
                        <path
                            d="M5.90625 11.4375H4.9375C4.75 11.4375 4.625 11.5625 4.625 11.75V12.6875C4.625 12.875 4.75 13 4.9375 13H5.90625C6.09375 13 6.21875 12.875 6.21875 12.6875V11.75C6.21875 11.5938 6.0625 11.4375 5.90625 11.4375Z"
                            fill="#637381"
                        />
                        <path
                            d="M9.96875 11.4375H9C8.8125 11.4375 8.6875 11.5625 8.6875 11.75V12.6875C8.6875 12.875 8.8125 13 9 13H9.96875C10.1562 13 10.2812 12.875 10.2812 12.6875V11.75C10.2812 11.5938 10.1562 11.4375 9.96875 11.4375Z"
                            fill="#637381"
                        />
                        <path
                            d="M14.0625 11.4375H13.0938C12.9063 11.4375 12.7812 11.5625 12.7812 11.75V12.6875C12.7812 12.875 12.9063 13 13.0938 13H14.0625C14.25 13 14.375 12.875 14.375 12.6875V11.75C14.375 11.5938 14.25 11.4375 14.0625 11.4375Z"
                            fill="#111928"
                        />
                        <path
                            d="M5.90625 15.4688H4.9375C4.75 15.4688 4.625 15.5938 4.625 15.7813V16.7188C4.625 16.9063 4.75 17.0313 4.9375 17.0313H5.90625C6.09375 17.0313 6.21875 16.9063 6.21875 16.7188V15.7813C6.21875 15.625 6.0625 15.4688 5.90625 15.4688Z"
                            fill="#111928"
                        />
                        <path
                            d="M9.96875 15.4688H9C8.8125 15.4688 8.6875 15.5938 8.6875 15.7813V16.7188C8.6875 16.9063 8.8125 17.0313 9 17.0313H9.96875C10.1562 17.0313 10.2812 16.9063 10.2812 16.7188V15.7813C10.2812 15.625 10.1562 15.4688 9.96875 15.4688Z"
                            fill="#111928"
                        />
                        <path
                            d="M14.0625 15.4688H13.0938C12.9063 15.4688 12.7812 15.5938 12.7812 15.7813V16.7188C12.7812 16.9063 12.9063 17.0313 13.0938 17.0313H14.0625C14.25 17.0313 14.375 16.9063 14.375 16.7188V15.7813C14.375 15.625 14.25 15.4688 14.0625 15.4688Z"
                            fill="#111928"
                        />
                        <path
                            d="M17 4.8125H10.2187V4.21875C10.9375 3.9375 11.4375 3.25 11.4375 2.4375C11.4375 1.375 10.5625 0.53125 9.5 0.53125C8.4375 0.53125 7.5625 1.375 7.5625 2.4375C7.5625 3.25 8.0625 3.9375 8.78125 4.21875V4.8125H2C0.9375 4.8125 0.03125 5.6875 0.03125 6.78125V17.5C0.03125 18.5625 0.90625 19.4687 2 19.4687H17C18.0625 19.4687 18.9687 18.5937 18.9687 17.5V6.75C18.9687 5.6875 18.0625 4.8125 17 4.8125ZM9.5 1.9375C9.78125 1.9375 10.0312 2.15625 10.0312 2.4375C10.0312 2.71875 9.8125 2.9375 9.5 2.9375C9.1875 2.9375 8.96875 2.71875 8.96875 2.4375C8.96875 2.15625 9.21875 1.9375 9.5 1.9375ZM2 6.21875H17C17.3125 6.21875 17.5625 6.46875 17.5625 6.78125V8.71875H1.46875V6.78125C1.46875 6.4375 1.6875 6.21875 2 6.21875ZM17 18.0625H2C1.6875 18.0625 1.4375 17.8125 1.4375 17.5V10.0937H17.5312V17.5C17.5625 17.8125 17.3125 18.0625 17 18.0625Z"
                            fill="#111928"
                        />
                    </svg>
                </div>
            </div>
            {showPopup && (
                <div className="absolute top-[6.5rem] z-40 flex h-fit w-[13.625rem] flex-col rounded-md border border-black bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                    {Object.keys(dateRange).map((key) => (
                        <button
                            type="button"
                            key={key}
                            className="flex h-[2.25rem] w-full cursor-pointer select-none flex-row items-center justify-center rounded-md px-[1rem] py-[0.5rem] hover:bg-gray-200"
                            onClick={() => {
                                setSelectedDateRange(key);
                                setShowPopup(!showPopup);
                            }}
                        >
                            <p className="text-center font-sans text-[1rem]">{dateRange[key]}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
