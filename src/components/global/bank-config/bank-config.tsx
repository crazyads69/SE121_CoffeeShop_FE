import { useState } from "react";
import { useSelector } from "react-redux";
import { bankList, USER_ROLE } from "../../../utils/constant/constant";
import { convertIsoStringToDate } from "@/utils/custom-functions/custom-functions";
import { RootState } from "@/redux/store";
import UpdateBankConfig from "./update-bank-config";
import TestBankQR from "./test-bank-qr";
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
export interface BankConfigProps {
    setShowBankConfig: (showBankConfig: boolean) => void;
}

export default function BankConfig({ setShowBankConfig }: BankConfigProps) {
    const bankConfig = useSelector((state: RootState) => state.auth.bankConfig);
    const [showBankUpdateModal, setShowBankUpdateModal] = useState<boolean>(false);
    const [showBankQRModal, setShowBankQRModal] = useState<boolean>(false);
    return (
        <div
            className="relative z-10 flex items-center justify-center overflow-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 backdrop-blur-lg" />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex h-full items-center justify-center">
                    <div
                        className="relative flex h-[22.4375rem]
w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pl-[3rem] py-[1.94rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowBankConfig(false);
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
                        <h1 className="text-left font-sans text-[1.5rem] font-bold text-[#1C3FB7]">
                            CẤU HÌNH NGÂN HÀNG
                        </h1>
                        {/* Product info */}
                        <div className="mt-[1.56rem] flex w-full flex-row items-start justify-start">
                            <div className="ml-[2rem] flex flex-col items-start justify-start">
                                {/* Product name and price */}
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem]">Mã ngân hàng:</h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {
                                            bankList.find(
                                                (bank) => bank.bin === bankConfig?.bank_id,
                                            )?.shortName
                                        }
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Tên tài khoản:</h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {bankConfig?.bank_account_name}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Số tài khoản: </h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {bankConfig?.bank_number}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Ngày tạo: </h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {convertIsoStringToDate(bankConfig?.created_at as string)}
                                    </p>
                                </div>
                                <div className="mt-[1.25rem] flex flex-row items-center justify-start">
                                    {/* Product delete button */}
                                    <button
                                        type="button"
                                        className="inline-flex h-[3.051rem] w-[7.836rem] items-center
justify-between rounded-md bg-[#12582E] px-[0.86rem] pb-[0.8rem] pt-[0.75rem]"
                                        onClick={() => {
                                            setShowBankUpdateModal(true);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="23"
                                            height="25"
                                            viewBox="0 0 23 25"
                                            fill="none"
                                        >
                                            <path
                                                d="M11.5743 0.967712C5.48768 0.967712 0.567383 6.11626 0.567383 12.4852C0.567383 18.8542 5.48768 24.0408 11.5743 24.0408C17.6609 24.0408 22.6176 18.8542 22.6176 12.4852C22.6176 6.11626 17.6609 0.967712 11.5743 0.967712ZM11.5743 22.3247C6.39884 22.3247 2.20748 17.9007 2.20748 12.4852C2.20748 7.0697 6.39884 2.6839 11.5743 2.6839C16.7497 2.6839 20.9775 7.10783 20.9775 12.5233C20.9775 17.9007 16.7497 22.3247 11.5743 22.3247Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M14.7085 8.93844L10.3714 13.3624L8.40323 11.3411C8.07521 10.9979 7.56496 11.036 7.23694 11.3411C6.90892 11.6843 6.94537 12.2183 7.23694 12.5615L9.56953 14.926C9.78821 15.1548 10.0798 15.2692 10.3714 15.2692C10.6629 15.2692 10.9545 15.1548 11.1732 14.926L15.8748 10.197C16.2028 9.85374 16.2028 9.31981 15.8748 8.97658C15.5468 8.63334 15.0365 8.63334 14.7085 8.93844Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <p className="font-sans text-[1rem] font-medium text-white">
                                            Cập nhật
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-[1rem] inline-flex h-[3.051rem] w-[7.836rem]
items-center justify-between rounded-md bg-[#E10E0E] px-[1rem] py-[0.75rem]"
                                        onClick={() => {
                                            setShowBankQRModal(true);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="#FFFFFF"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <p className="font-sans text-[1rem] font-medium text-white">
                                            Test QR
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showBankUpdateModal && (
                <UpdateBankConfig setShowBankUpdateModal={setShowBankUpdateModal} />
            )}
            {showBankQRModal && <TestBankQR setShowBankQRModal={setShowBankQRModal} />}
        </div>
    );
}
