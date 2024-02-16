/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { statusList } from "@/utils/constant/constant";

export interface StatusFilterProps {
    selectedStatus: string;
    setSelectedStatus: (selectedStatus: string) => void;
}

export default function StatusFilter({ selectedStatus, setSelectedStatus }: StatusFilterProps) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    return (
        <div className="relative">
            <div className="mt-[1.19rem] flex h-[6.75rem] w-[13.625rem] flex-col items-start rounded-md bg-white pb-[1.94rem] pl-[0.74rem] pr-[1.25rem] pt-[0.56rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <label className="select-none font-sans text-[1rem] font-bold" htmlFor="filter">
                    Trạng thái
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
                        {selectedStatus === "allStatus"
                            ? "Chọn trạng thái"
                            : selectedStatus === "pending"
                              ? "Đang chờ"
                              : "Đã hoàn thành"}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                    </svg>
                </div>
            </div>
            {showPopup && (
                <div className="absolute top-[6.5rem] z-40 flex h-fit w-[13.625rem] flex-col rounded-md border border-black bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                    {statusList.map((key) => (
                        <button
                            type="button"
                            key={key}
                            className="flex h-[2.25rem] w-full cursor-pointer select-none flex-row items-center justify-center rounded-md px-[1rem] py-[0.5rem] hover:bg-gray-200"
                            onClick={() => {
                                setSelectedStatus(key);
                                setShowPopup(!showPopup);
                            }}
                        >
                            <p className="text-center font-sans text-[1rem]">
                                {key === "allStatus"
                                    ? "Tất cả"
                                    : key === "pending"
                                      ? "Đang chờ"
                                      : "Đã hoàn thành"}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
