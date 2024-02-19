/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
    convertDateToServerFormat,
    convertDateToUSFormat,
    formatCurrency,
} from "@/utils/custom-functions/custom-functions";
import { clearMessage, setError, setSuccess } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import PostAddVoucher from "@/api/voucher/post-add-voucher";

export interface AddVoucherItemProps {
    setShowAddVoucherModal: (show: boolean) => void;
}

const voucherTypeList = ["direct", "percent"];

export default function AddVoucherItem({ setShowAddVoucherModal }: AddVoucherItemProps) {
    // State for hold voucher code
    const [voucherCode, setVoucherCode] = useState<string>("");
    // State for hold voucher type direct or percent
    const [voucherType, setVoucherType] = useState<string>("direct");
    // State for hold voucher amount
    const [voucherAmount, setVoucherAmount] = useState<string>("");
    // State for hold voucher quantity
    const [voucherQuantity, setVoucherQuantity] = useState<string>("");
    // State for hold voucher start date
    const [voucherStartDate, setVoucherStartDate] = useState<string>("");
    // State for hold voucher end date
    const [voucherEndDate, setVoucherEndDate] = useState<string>("");
    // State for show voucher type dropdown
    const [showVouchertTypeDropdown, setShowVoucherTypeDropdown] = useState<boolean>(false);
    // State for voucher input error
    const [errorVoucherCode, setErrorVoucherCode] = useState<boolean>(false);
    const [errorVoucherAmount, setErrorVoucherAmount] = useState<boolean>(false);
    const [errorVoucherQuantity, setErrorVoucherQuantity] = useState<boolean>(false);
    const [errorVoucherStartDate, setErrorVoucherStartDate] = useState<boolean>(false);
    const [errorVoucherEndDate, setErrorVoucherEndDate] = useState<boolean>(false);
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputAmountRef = useRef<HTMLInputElement>(null);
    const inputQuantityRef = useRef<HTMLInputElement>(null);
    const inputStartDateRef = useRef<HTMLInputElement>(null);
    const inputEndDateRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    // Handle click outside type dropdown
    const handleClickOutside = (e: MouseEvent) => {
        // If click outside type dropdown then close it
        if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
            setShowVoucherTypeDropdown(false);
        }
    };
    // Add event listener for click outside type dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // handle remove error class when user type in input field use ref
    useEffect(() => {
        if (errorVoucherAmount && inputAmountRef.current) {
            inputAmountRef.current.addEventListener("input", () => {
                setErrorVoucherAmount(false);
            });
        }
        if (errorVoucherCode && inputNameRef.current) {
            inputNameRef.current.addEventListener("input", () => {
                setErrorVoucherCode(false);
            });
        }
        if (errorVoucherQuantity && inputQuantityRef.current) {
            inputQuantityRef.current.addEventListener("input", () => {
                setErrorVoucherQuantity(false);
            });
        }
        if (errorVoucherStartDate && inputStartDateRef.current) {
            inputStartDateRef.current.addEventListener("input", () => {
                setErrorVoucherStartDate(false);
            });
        }
        if (errorVoucherEndDate && inputEndDateRef.current) {
            inputEndDateRef.current.addEventListener("input", () => {
                setErrorVoucherEndDate(false);
            });
        }
    }, [
        errorVoucherAmount,
        errorVoucherCode,
        errorVoucherQuantity,
        errorVoucherStartDate,
        errorVoucherEndDate,
    ]);
    // Remove error class when user type in input field timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (errorVoucherAmount) {
                setErrorVoucherAmount(false);
            }
            if (errorVoucherCode) {
                setErrorVoucherCode(false);
            }
            if (errorVoucherQuantity) {
                setErrorVoucherQuantity(false);
            }
            if (errorVoucherStartDate) {
                setErrorVoucherStartDate(false);
            }
            if (errorVoucherEndDate) {
                setErrorVoucherEndDate(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [
        errorVoucherAmount,
        errorVoucherCode,
        errorVoucherQuantity,
        errorVoucherStartDate,
        errorVoucherEndDate,
    ]);
    const handleVoucherAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow number input
        const inputAmount = e.target.value.replace(/\D/g, "");
        // Format currency if type is direct
        let formattedAmoiunt = "";
        if (voucherType === "direct") {
            formattedAmoiunt = inputAmount === "" ? "" : formatCurrency(parseInt(inputAmount, 10));
        } else formattedAmoiunt = inputAmount;
        setVoucherAmount(formattedAmoiunt);
    };
    // Convert currency to number when user click out of input field
    const convertCurrencyToNumber = (data: string) => {
        return data.replace(/\D/g, "");
    };
    // Format date
    const autoFormatDateString = (data: string) => {
        // Remove any existing slashes from the input and remove any non-digit characters
        let input = data.replace(/\//g, "").replace(/[^0-9/]/g, "");

        // Format the input with slashes after the day and month
        if (input.length > 2 && input.length <= 4) {
            // Add slash after the day
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        } else if (input.length > 4) {
            // Add slashes after the day and month
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        }

        // Prevent input after the input year
        if (input.length >= 10) {
            input = input.slice(0, 10);
        }

        return input;
    };
    const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow number
        const data = e.target.value;
        const inputStartDate = autoFormatDateString(data);
        setVoucherStartDate(inputStartDate);
    };
    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.value;
        const inputEndDate = autoFormatDateString(data);
        setVoucherEndDate(inputEndDate);
    };

    // Handle save voucher
    const handleSaveVoucher = async () => {
        if (
            voucherCode === "" ||
            voucherAmount === "" ||
            voucherQuantity === "" ||
            voucherStartDate === "" ||
            voucherEndDate === ""
        ) {
            // Show popup error
            dispatch(setError("Vui lòng nhập đầy đủ thông tin voucher"));
            // Check if voucher code is empty
            if (voucherCode === "") {
                setErrorVoucherCode(true);
                return;
            }
            // Check if voucher amount is empty
            if (voucherAmount === "") {
                setErrorVoucherAmount(true);
                return;
            }
            // Check if voucher quantity is empty
            if (voucherQuantity === "") {
                setErrorVoucherQuantity(true);
                return;
            }
            // Check if voucher start date is empty
            if (voucherStartDate === "") {
                setErrorVoucherStartDate(true);
                return;
            }
            // Check if voucher end date is empty
            if (voucherEndDate === "") {
                setErrorVoucherEndDate(true);
                return;
            }

            // Check if voucher quantity is not a number
            if (Number.isNaN(parseInt(voucherQuantity, 10))) {
                setErrorVoucherQuantity(true);
                return;
            }
            // Check if voucher amount is not a number
            if (Number.isNaN(parseInt(voucherAmount, 10))) {
                setErrorVoucherAmount(true);
                return;
            }
        }
        // Check if voucher start date is greater than end date
        const startDate = new Date(convertDateToServerFormat(voucherStartDate));
        const endDate = new Date(convertDateToServerFormat(voucherEndDate));
        if (startDate > endDate) {
            dispatch(setError("Ngày bắt đầu phải nhỏ hơn ngày hết hạn"));
            setErrorVoucherStartDate(true);
            setErrorVoucherEndDate(true);
            return;
        }
        // Check valid amount if voucher type is percent
        if (voucherType === "percent") {
            if (parseInt(voucherAmount, 10) > 100 || parseInt(voucherAmount, 10) < 0) {
                dispatch(setError("Mức giảm giá phần trăm phải nhỏ hơn 100%"));
                setErrorVoucherAmount(true);
                return;
            }
        }
        dispatch(clearMessage());
        const amount =
            voucherType === "direct"
                ? parseInt(convertCurrencyToNumber(voucherAmount), 10)
                : parseInt(voucherAmount, 10);
        const quantity = parseInt(voucherQuantity, 10);
        const start_date = convertDateToUSFormat(voucherStartDate);
        const end_date = convertDateToUSFormat(voucherEndDate);
        await PostAddVoucher(
            voucherCode,
            voucherType,
            amount,
            quantity,
            start_date,
            end_date,
            setShowAddVoucherModal,
            dispatch,
        );
    };
    return (
        <div
            className="relative z-10 flex items-center justify-start overflow-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 backdrop-blur-lg" />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex h-full items-center justify-center">
                    <div
                        className="relative flex
h-[38.3125rem] w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pt-[1.25rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowAddVoucherModal(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M13.2001 12L22.3501 2.84998C22.6876 2.51248 22.6876 1.98748 22.3501 1.64998C22.0126 1.31248 21.4876 1.31248 21.1501 1.64998L12.0001 10.8L2.8501 1.64998C2.5126 1.31248 1.9876 1.31248 1.6501 1.64998C1.3126 1.98748 1.3126 2.51248 1.6501 2.84998L10.8001 12L1.6501 21.15C1.3126 21.4875 1.3126 22.0125 1.6501 22.35C1.8001 22.5 2.0251 22.6125 2.2501 22.6125C2.4751 22.6125 2.7001 22.5375 2.8501 22.35L12.0001 13.2L21.1501 22.35C21.3001 22.5 21.5251 22.6125 21.7501 22.6125C21.9751 22.6125 22.2001 22.5375 22.3501 22.35C22.6876 22.0125 22.6876 21.4875 22.3501 21.15L13.2001 12Z"
                                    fill="#111928"
                                />
                            </svg>
                        </button>
                        {/* Modal title */}
                        <div
                            className="flex h-[3.125rem] w-[53.9375rem] flex-row
items-center justify-start border-b border-[#000000] pb-[0.56rem] pl-[1rem] pt-[0.69rem]"
                        >
                            <h1 className="font-sans text-[1rem] font-bold">Thêm voucher</h1>
                        </div>
                        {/* Product info */}
                        <div className="flex w-full flex-row items-start justify-start pb-[8.81rem] pl-[4.75rem] pt-[2.88rem]">
                            <div className="ml-[3.5rem] flex flex-col items-start justify-start">
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Mã voucher:
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputNameRef}
                                        value={voucherCode}
                                        onChange={(e) => {
                                            setVoucherCode(e.target.value.toUpperCase());
                                        }}
                                        maxLength={255}
                                        placeholder="Nhập mã voucher"
                                        className={`col-start-2 rounded-md border ${
                                            errorVoucherCode ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Giảm giá:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputAmountRef}
                                        value={voucherAmount}
                                        onChange={handleVoucherAmount}
                                        maxLength={255}
                                        placeholder="Nhập mức giảm giá"
                                        className={`col-start-2 rounded-md border ${
                                            errorVoucherAmount
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Ngày bắt đầu:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputStartDateRef}
                                        value={voucherStartDate}
                                        onChange={handleStartDate}
                                        maxLength={255}
                                        placeholder="Nhập ngày bắt đầu"
                                        className={`col-start-2 rounded-md border ${
                                            errorVoucherStartDate
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Ngày hết hạn:
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputEndDateRef}
                                        value={voucherEndDate}
                                        onChange={handleEndDate}
                                        maxLength={255}
                                        placeholder="Nhập ngày hết hạn"
                                        className={`col-start-2 rounded-md border ${
                                            errorVoucherEndDate
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Số lượng:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputQuantityRef}
                                        value={voucherQuantity}
                                        onChange={(e) => {
                                            setVoucherQuantity(e.target.value);
                                        }}
                                        maxLength={255}
                                        placeholder="Nhập số lượng voucher"
                                        className={`col-start-2 rounded-md border ${
                                            errorVoucherQuantity
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />

                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Loại voucher:{" "}
                                    </h1>
                                    <button
                                        type="button"
                                        className="relative col-start-2 inline-flex cursor-pointer items-center justify-between rounded-md border border-[#DFE4EA] bg-white px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                        onClick={() => {
                                            setShowVoucherTypeDropdown(!showVouchertTypeDropdown);
                                        }}
                                    >
                                        {voucherType === "direct"
                                            ? "Giảm trực tiếp"
                                            : "Giảm phần trăm"}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="6"
                                            viewBox="0 0 12 6"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.0001 5.97495C5.86885 5.97495 5.75947 5.9312 5.6501 5.8437L0.618848 0.899951C0.421973 0.703076 0.421973 0.396826 0.618848 0.199951C0.815723 0.00307633 1.12197 0.00307633 1.31885 0.199951L6.0001 4.77183L10.6813 0.156201C10.8782 -0.0406738 11.1845 -0.0406738 11.3813 0.156201C11.5782 0.353076 11.5782 0.659326 11.3813 0.856201L6.3501 5.79995C6.24072 5.90933 6.13135 5.97495 6.0001 5.97495Z"
                                                fill="#111928"
                                            />
                                        </svg>
                                    </button>
                                    {/* Product type dropdown */}
                                    {showVouchertTypeDropdown && (
                                        <div
                                            ref={typeDropdownRef}
                                            className="absolute right-[19.75rem] top-[30rem] z-10 flex w-[11.625rem] flex-col rounded-md bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]"
                                        >
                                            {voucherTypeList.map((type) => (
                                                <button
                                                    type="button"
                                                    key={type}
                                                    className="inline-flex w-full items-center justify-start px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                                    onClick={() => {
                                                        setVoucherType(type);
                                                        setShowVoucherTypeDropdown(false);
                                                    }}
                                                >
                                                    {type === "direct"
                                                        ? "Giảm trực tiếp"
                                                        : "Giảm phần trăm"}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Product save button */}
                                <button
                                    type="button"
                                    onClick={handleSaveVoucher}
                                    className="mt-[3.37em] inline-flex h-[3.125rem] w-[11.875rem] items-center justify-center rounded-md border border-[#DFE4EA] bg-[#12582E] px-[1.75rem] py-[0.81rem] font-sans text-white"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
