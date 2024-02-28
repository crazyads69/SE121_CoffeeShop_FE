/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Customer } from "@/redux/slices/customer-slice";
import PostUpdateCustomer from "@/api/customer/post-update-customer";
import { setError } from "@/redux/slices/alert-slice";

export interface UpdateCustomerProps {
    customer: Customer;
    setShowUpdateCustomerModal: (showUpdateCustomerModal: boolean) => void;
    setShowCustomerDetail: (showCustomerDetail: boolean) => void;
}

export default function UpdateCustomer({
    customer,
    setShowUpdateCustomerModal,
    setShowCustomerDetail,
}: UpdateCustomerProps) {
    // State for each input field
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    // State for each input field error
    const [nameError, setNameError] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<boolean>(false);
    // Ref for each input field
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    // Load customer info when component mount
    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setPhone(customer.phone_number);
        }
    }, [customer]);
    // Remove error when user type in input field
    useEffect(() => {
        if (nameError && nameRef.current) {
            nameRef.current.addEventListener("input", () => {
                setNameError(false);
            });
        }
        if (phoneError && phoneRef.current) {
            phoneRef.current.addEventListener("input", () => {
                setPhoneError(false);
            });
        }
    }, [nameError, phoneError, nameRef, phoneRef]);
    // Timeout for error message
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (nameError) {
                setNameError(false);
            }
            if (phoneError) {
                setPhoneError(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [nameError, phoneError]);
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only number input
        const inputPhone = e.target.value.replace(/\D/g, "");
        setPhone(inputPhone);
    };
    const dispatch = useDispatch();
    const handleAddCustomer = async () => {
        if (name === "" || phone === "") {
            dispatch(setError("Vui lòng nhập đầy đủ thông tin"));
            if (name === "") {
                setNameError(true);
            }
            if (phone === "") {
                setPhoneError(true);
            }
            return;
        }
        await PostUpdateCustomer(
            customer.id,
            name,
            phone,
            customer,
            setShowUpdateCustomerModal,
            setShowCustomerDetail,
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
                                setShowUpdateCustomerModal(false);
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
                            <h1 className="font-sans text-[1rem] font-bold">Cập nhật khách hàng</h1>
                        </div>
                        {/* Product info */}
                        <div className="flex w-full flex-row items-start justify-start pb-[8.81rem] pl-[4.75rem] pt-[2.88rem]">
                            <div className="ml-[3.5rem] flex flex-col items-start justify-start">
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Tên khách hàng:{" "}
                                    </h1>
                                    <input
                                        type="text"
                                        ref={nameRef}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        maxLength={255}
                                        placeholder="Nhập tên khách hàng"
                                        className={`col-start-2 rounded-md border ${
                                            nameError ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">SĐT: </h1>
                                    <input
                                        type="text"
                                        ref={phoneRef}
                                        value={phone}
                                        onChange={handlePhoneInput}
                                        maxLength={10}
                                        placeholder="Nhập số điện thoại"
                                        className={`col-start-2 rounded-md border ${
                                            phoneError ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] pl-[1.25rem] pr-[1rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                </div>
                                {/* Product save button */}
                                <button
                                    type="button"
                                    onClick={handleAddCustomer}
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
