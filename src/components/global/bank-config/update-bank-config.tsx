/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import PostUpdateVoucher from "@/api/voucher/post-update-voucher";
import voucherType from "@/components/page/admin/voucher/voucher-type/voucher-type";
import { setError, clearMessage } from "@/redux/slices/alert-slice";
import {
    convertDateToServerFormat,
    convertDateToUSFormat,
} from "@/utils/custom-functions/custom-functions";
import { bankList, voucherTypeList } from "@/utils/constant/constant";
import PostBankConfig from "@/api/auth/post-bank-config";

export interface UpdateBankConfigProps {
    setShowBankUpdateModal: (showBankUpdateModal: boolean) => void;
}

export default function UpdateBankConfig({ setShowBankUpdateModal }: UpdateBankConfigProps) {
    const dispatch = useDispatch();
    const bankConfig = useSelector((state: RootState) => state.auth.bankConfig);
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
    const [bankAccountName, setBankAccountName] = useState<string>("");
    const [bankAccountNumberError, setBankAccountNumberError] = useState<boolean>(false);
    const [bankAccountNameError, setBankAccountNameError] = useState<boolean>(false);
    const inputBankAccountNumberRef = useRef<HTMLInputElement>(null);
    const inputBankAccountNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Update bank config data
        if (bankConfig) {
            setSelectedBank(bankConfig.bank_id);
            setBankAccountNumber(bankConfig.bank_number);
            setBankAccountName(bankConfig.bank_account_name);
        }
    }, []);

    // handle remove error class when user type in input field use ref
    useEffect(() => {
        if (bankAccountNameError && inputBankAccountNameRef.current) {
            inputBankAccountNameRef.current.addEventListener("input", () => {
                setBankAccountNameError(false);
            });
        }
        if (bankAccountNumberError && inputBankAccountNumberRef.current) {
            inputBankAccountNumberRef.current.addEventListener("input", () => {
                setBankAccountNumberError(false);
            });
        }
    }, [bankAccountNameError, bankAccountNumberError]);
    // Remove error class when user type in input field timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (bankAccountNameError) {
                setBankAccountNameError(false);
            }
            if (bankAccountNumberError) {
                setBankAccountNumberError(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [bankAccountNameError, bankAccountNumberError]);
    // Handle bank account number change
    const handleBankAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow number input
        const inputAmount = e.target.value.replace(/\D/g, "");
        setBankAccountNumber(inputAmount);
    };

    const handleSaveBankConfig = async () => {
        if (bankAccountName === "" || bankAccountNumber === "") {
            // Show popup error
            dispatch(setError("Vui lòng nhập đầy đủ thông tin ngân hàng"));
            // Check if voucher code is empty
            if (bankAccountName === "") {
                setBankAccountNameError(true);
                return;
            }
            // Check if voucher amount is empty
            if (bankAccountNumber === "") {
                setBankAccountNumberError(true);
                return;
            }
            // Check if bank account number is not a number
            if (Number.isNaN(parseInt(bankAccountNumber, 10))) {
                setBankAccountNumberError(true);
            }
        }
        // Call API to update bank config
        await PostBankConfig(
            selectedBank,
            bankAccountNumber,
            bankAccountName,
            setShowBankUpdateModal,
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
h-fit w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pt-[1.25rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowBankUpdateModal(false);
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
                            <h1 className="font-sans text-[1rem] font-bold">Cập nhật ngân hàng</h1>
                        </div>
                        {/* Product info */}
                        <div className="flex w-full flex-row items-start justify-start pb-[4.81rem] pl-[4.75rem] pt-[2.88rem]">
                            <div className="ml-[3.5rem] flex flex-col items-start justify-start">
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Ngân hàng:
                                    </h1>
                                    <select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="col-start-2 rounded-md border border-[#DFE4EA] bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]"
                                    >
                                        {bankList.map((bank) => (
                                            <option key={bank.id} value={bank.bin}>
                                                {bank.shortName}
                                            </option>
                                        ))}
                                    </select>
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Tên tài khoản:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputBankAccountNameRef}
                                        value={bankAccountName}
                                        onChange={(e) =>
                                            setBankAccountName(e.target.value.toUpperCase())
                                        }
                                        maxLength={255}
                                        placeholder="Nhập tên tài khoản ngân hàng"
                                        className={`col-start-2 rounded-md border ${
                                            bankAccountNameError
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Số tài khoản:
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputBankAccountNumberRef}
                                        value={bankAccountNumber}
                                        onChange={handleBankAccountNumberChange}
                                        maxLength={255}
                                        placeholder="Nhập số tài khoản ngân hàng"
                                        className={`col-start-2 rounded-md border ${
                                            bankAccountNumberError
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                </div>
                                {/* Product save button */}
                                <button
                                    type="button"
                                    onClick={handleSaveBankConfig}
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
