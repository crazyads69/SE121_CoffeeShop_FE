/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PostAddLoyal from "@/api/loyal/post-add-loyal";
import { setError } from "@/redux/slices/alert-slice";
import { Loyal } from "@/redux/slices/loyal-slice";
import { formatCurrency } from "@/utils/custom-functions/custom-functions";
import PostUpdateLoyal from "@/api/loyal/post-update-loyal";

export interface UpdateLoyalProps {
    loyal: Loyal;
    setShowUpdateLoyalModal: (show: boolean) => void;
    setShowLoyalDetail: (show: boolean) => void;
}

const loyalTypeList = ["direct", "percent"];

export default function UpdateLoyal({
    loyal,
    setShowUpdateLoyalModal,
    setShowLoyalDetail,
}: UpdateLoyalProps) {
    // State for hold loyal name
    const [loyalName, setLoyalName] = useState<string>("");
    // State for hold min loyal spend
    const [minSpend, setMinSpend] = useState<string>("");
    // State for hold type of loyal type (default is direct)
    const [loyalType, setLoyalType] = useState<string>("direct");
    // State for hold amount of loyal
    const [loyalAmount, setLoyalAmount] = useState<string>("");
    // State for show dropdown of loyal type
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // State for hold error input
    const [errorLoyalName, setErrorLoyalName] = useState<boolean>(false);
    const [errorMinSpend, setErrorMinSpend] = useState<boolean>(false);
    const [errorLoyalAmount, setErrorLoyalAmount] = useState<boolean>(false);
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputMinSpendRef = useRef<HTMLInputElement>(null);
    const inputAmountRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    // Update value when component mount
    useEffect(() => {
        setLoyalName(loyal.name);
        setMinSpend(formatCurrency(loyal.spending_min));
        setLoyalType(loyal.type);
        setLoyalAmount(
            loyal.type === "direct" ? formatCurrency(loyal.amount) : loyal.amount.toString(),
        );
    }, []);

    // Handle click outside type dropdown
    const handleClickOutside = (e: MouseEvent) => {
        // If click outside type dropdown then close it
        if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
            setShowDropdown(false);
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
        if (errorLoyalAmount && inputAmountRef.current) {
            inputAmountRef.current.addEventListener("input", () => {
                setErrorLoyalAmount(false);
            });
        }
        if (errorLoyalName && inputNameRef.current) {
            inputNameRef.current.addEventListener("input", () => {
                setErrorLoyalName(false);
            });
        }
        if (errorMinSpend && inputMinSpendRef.current) {
            inputMinSpendRef.current.addEventListener("input", () => {
                setErrorMinSpend(false);
            });
        }
    }, [errorLoyalAmount, errorLoyalName, errorMinSpend]);

    // Remove error class when user type in input field timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (errorLoyalAmount) {
                setErrorLoyalAmount(false);
            }
            if (errorLoyalName) {
                setErrorLoyalName(false);
            }
            if (errorMinSpend) {
                setErrorMinSpend(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [errorLoyalAmount, errorLoyalName, errorMinSpend]);

    // Handle amount input change
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow user input number
        const amount = e.target.value.replace(/\D/g, "");
        let formattedAmount = "";
        // Check if type of voucher is direct then format amount to currency (1,000,000) else percent must be 0-100
        if (loyalType === "direct") {
            formattedAmount = amount === "" ? "" : formatCurrency(parseInt(amount, 10));
        } else formattedAmount = amount;
        setLoyalAmount(formattedAmount);
    };

    // Handle min spend input change
    const handleMinSpendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow user input number
        const inputMinSpend = e.target.value.replace(/\D/g, "");
        setMinSpend(formatCurrency(parseInt(inputMinSpend, 10)));
    };

    const convertCurrencyToNumber = (data: string) => {
        return data.replace(/\D/g, "");
    };

    // Handle save loyal
    const handleUpdateLoyal = async () => {
        // Make sure user input all required field
        if (loyalName === "" || minSpend === "" || loyalAmount === "") {
            dispatch(setError("Vui lòng nhập đầy đủ thông tin voucher"));

            if (loyalName === "") {
                setErrorLoyalName(true);
                return;
            }
            if (minSpend === "") {
                setErrorMinSpend(true);
                return;
            }
            if (loyalAmount === "") {
                setErrorLoyalAmount(true);
            }

            // Check if voucher amount is a number
            if (Number.isNaN(parseInt(loyalAmount, 10))) {
                setErrorLoyalAmount(true);
            }
        }
        // Check valid amount if voucher type is percent
        if (loyalType === "percent") {
            if (parseInt(loyalAmount, 10) > 100 || parseInt(loyalAmount, 10) < 0) {
                dispatch(setError("Mức giảm giá phần trăm phải nhỏ hơn 100%"));
                setErrorLoyalAmount(true);
                return;
            }
        }
        // Save loyal
        const amount =
            loyalType === "direct"
                ? parseInt(convertCurrencyToNumber(loyalAmount), 10)
                : parseInt(loyalAmount, 10);
        const minSpendNumber = parseInt(convertCurrencyToNumber(minSpend), 10);
        // Call api to update loyal
        await PostUpdateLoyal(
            String(loyal.id),
            loyalName,
            minSpendNumber,
            loyalType,
            amount,
            loyal,
            setShowUpdateLoyalModal,
            setShowLoyalDetail,
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
                                setShowUpdateLoyalModal(false);
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
                            <h1 className="font-sans text-[1rem] font-bold">Thêm mức thành viên</h1>
                        </div>
                        {/* Product info */}
                        <div className="flex w-full flex-row items-start justify-start pb-[8.81rem] pl-[4.75rem] pt-[2.88rem]">
                            <div className="ml-[3.5rem] flex flex-col items-start justify-start">
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Mức thành viên:
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputNameRef}
                                        value={loyalName}
                                        onChange={(e) => {
                                            setLoyalName(e.target.value);
                                        }}
                                        maxLength={255}
                                        placeholder="Nhập tên mức thành viên"
                                        className={`col-start-2 rounded-md border ${
                                            errorLoyalAmount ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Giảm giá:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputAmountRef}
                                        value={loyalAmount}
                                        onChange={handleAmountChange}
                                        maxLength={255}
                                        placeholder="Nhập mức giảm giá"
                                        className={`col-start-2 rounded-md border ${
                                            errorLoyalAmount ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Mức chi tiêu tối thiểu:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputMinSpendRef}
                                        value={minSpend}
                                        onChange={handleMinSpendChange}
                                        maxLength={255}
                                        placeholder="Nhập mức chi tiêu tối thiểu"
                                        className={`col-start-2 rounded-md border ${
                                            errorMinSpend ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Loại voucher:{" "}
                                    </h1>
                                    <button
                                        type="button"
                                        className="relative col-start-2 inline-flex cursor-pointer items-center justify-between rounded-md border border-[#DFE4EA] bg-white px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                        onClick={() => {
                                            setShowDropdown(!showDropdown);
                                        }}
                                    >
                                        {loyalType === "direct"
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
                                    {showDropdown && (
                                        <div
                                            ref={typeDropdownRef}
                                            className="absolute right-[19.75rem] top-[30rem] z-10 flex w-[11.625rem] flex-col rounded-md bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]"
                                        >
                                            {loyalTypeList.map((type) => (
                                                <button
                                                    type="button"
                                                    key={type}
                                                    className="inline-flex w-full items-center justify-start px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                                    onClick={() => {
                                                        setLoyalType(type);
                                                        setShowDropdown(false);
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
                                    onClick={handleUpdateLoyal}
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
