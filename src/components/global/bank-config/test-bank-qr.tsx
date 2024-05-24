/* eslint-disable jsx-a11y/control-has-associated-label */
import { use, useEffect } from "react";
import Image from "next/image";
import useGetBankQR from "@/hooks/auth/useGetBankQR";
import { bankList } from "@/utils/constant/constant";
import { convertIsoStringToDate } from "@/utils/custom-functions/custom-functions";
import bankConfig from "./bank-config";
import UpdateBankConfig from "./update-bank-config";
import Loading from "../loading/Loading";

export interface TestBankQRProps {
    setShowBankQRModal: (showBankQRModal: boolean) => void;
}

export default function TestBankQR({ setShowBankQRModal }: TestBankQRProps) {
    const { bankQR, fetchBankQR, isLoadingQR } = useGetBankQR();
    useEffect(() => {
        // Fetch bank QR code
        fetchBankQR();
    }, []);

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
                        className="relative flex h-fit
w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pl-[3rem] py-[1.94rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowBankQRModal(false);
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
                            TEST QR CHUYỂN KHOẢN
                        </h1>
                        {/* Product info */}
                        <div className="mt-[1.56rem] flex w-full flex-row items-center justify-center">
                            <div className="mt-[1.25rem] flex flex-row items-center justify-center">
                                <div className="mt-[0.5rem] flex flex-row items-center justify-center">
                                    {isLoadingQR === true ? (
                                        <Loading />
                                    ) : (
                                        <Image
                                            src={bankQR}
                                            alt="QR code"
                                            width={440}
                                            height={540}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
