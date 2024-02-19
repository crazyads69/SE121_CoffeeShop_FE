/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { clearMessage, setError, setSuccess } from "@/redux/slices/alert-slice";
import {
    CheckoutItem,
    updateCustomerPhone,
    updateTableNumber,
    updateVoucherCode,
} from "@/redux/slices/checkout-slice";
import { Product } from "@/redux/slices/product-slice";
import { formatCurrency } from "@/utils/custom-functions/custom-functions";

import PostAddCheckout from "@/api/checkout/post-add-checkout";
import PostVerifyVoucher from "@/api/checkout/post-verify-voucher";

export interface CheckoutDetailProps {
    showDetailCheckoutModal: boolean;
    setShowDetailCheckoutModal: (showDetailCheckoutModal: boolean) => void;
}

export default function CheckoutDetail({
    showDetailCheckoutModal,
    setShowDetailCheckoutModal,
}: CheckoutDetailProps) {
    const checkouts = useSelector((state: RootState) => state.checkout.checkoutList);
    const products = useSelector((state: RootState) => state.product.products);
    // Map productID to product name
    const productName = (productID: string) => {
        return products.find((product: Product) => product.id === productID)?.name;
    };
    const voucherCode = useSelector((state: RootState) => state.checkout.checkoutList.voucherCode);
    // State for voucher input
    const dispatch = useDispatch();
    const [voucher, setVoucher] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [money, setMoney] = useState<string>("");
    const [tableData, setTableData] = useState<number>(0);
    // State for disable continue button when not calculate return money
    const [disableContinue, setDisableContinue] = useState<boolean>(true);
    // State for show pay bill modal
    const [showPayBillModal, setShowPayBillModal] = useState<boolean>(false);
    const [returnMoney, setReturnMoney] = useState<string>("");
    // Update voucher state
    useEffect(() => {
        if (voucher) {
            dispatch(updateVoucherCode(voucher));
        }
    }, [voucher]);
    // Update phone state
    useEffect(() => {
        if (phone) {
            dispatch(updateCustomerPhone(phone));
        }
    }, [phone]);
    // Check if has voucher and phone in store then update for input
    useEffect(() => {
        if (voucherCode) {
            setVoucher(voucherCode);
        }
        if (checkouts.customerPhone) {
            setPhone(checkouts.customerPhone);
        }
    }, []);
    // Handle checkout
    const handleCheckout = async () => {
        // Verify voucher code and get discount price
        if (voucherCode) {
            await PostVerifyVoucher(
                voucherCode,
                tableData,
                checkouts,
                setShowPayBillModal,
                setVoucher,
                dispatch,
            );
        } else {
            // Clear voucher code
            dispatch(updateVoucherCode(null));
            setVoucher("");
            // Update table data
            setTableData(tableData);
            dispatch(updateTableNumber(tableData));
            // Show pay bill modal
            setShowPayBillModal(true);
        }
    };
    // Handle product type

    // Handle product price
    const handleMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow number input
        const inputPrice = e.target.value.replace(/\D/g, "");
        // If input is empty, set product price to empty string to prevent error NaN when format
        // currency else format input price to currency format
        const formattedPrice = inputPrice === "" ? "" : formatCurrency(parseInt(inputPrice, 10));
        // Set money state to formatted price
        setMoney(formattedPrice);
    };
    // Handle return money
    const handleReturnMoney = () => {
        // Get total price
        const { totalPrice } = checkouts;
        // Get discount price
        const { discountPrice } = checkouts;
        // Get money
        const moneyInput = money.replace(/\D/g, "");
        // If money is empty, set money to 0
        const moneyInputNumber = moneyInput === "" ? 0 : parseInt(moneyInput, 10);
        // Calculate return money
        const returnMoney = moneyInputNumber - totalPrice + discountPrice;
        // If return money < 0, show error
        if (returnMoney < 0) {
            dispatch(setError("Số tiền khách đưa không đủ"));
            return;
        }
        // Set money state to formatted return money
        setReturnMoney(formatCurrency(returnMoney));
        // Enable continue button
        setDisableContinue(false);
    };
    // Handle finish checkout
    const handleFinishCheckout = async () => {
        await PostAddCheckout(
            checkouts,
            setVoucher,
            setPhone,
            setMoney,
            setReturnMoney,
            setShowPayBillModal,
            setShowDetailCheckoutModal,
            dispatch,
        );
    };
    return (
        <>
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
                            className="relative flex h-[39.125rem]
w-[59.5rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pb-[2.92rem] pl-[1.62rem] pr-[1rem] pt-[0.56rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                        >
                            {/* close button */}
                            <button
                                type="button"
                                className="absolute right-5 top-5"
                                onClick={() => {
                                    setShowDetailCheckoutModal(false);
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
                            {/* Product name and price */}
                            <p className="font-sans text-[1.5rem] font-bold"> Phiếu thanh toán</p>
                            {/* Billing info */}
                            <div className="flex h-full w-full flex-col justify-start">
                                <div
                                    className="mt-[0.75rem] h-[18.5rem] overflow-x-hidden overflow-y-scroll
rounded-[0.625rem] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.08)]"
                                >
                                    <table className="w-full text-left rtl:text-right">
                                        <thead className="h-[3.75rem] border-b border-[#EEE] bg-[#D9D9D9] font-sans text-[0.9375rem] font-normal text-[#111928]">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                >
                                                    DANH SÁCH
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                />
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                />
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Product item */}
                                            {checkouts.items.map((item: CheckoutItem) => (
                                                <tr
                                                    key={item.productID}
                                                    className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                                >
                                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                        {item.productID}
                                                    </td>
                                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                        {productName(item.productID)}
                                                    </td>
                                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                        {item.quantity}
                                                    </td>

                                                    <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                        {formatCurrency(item.unit_price)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Total price */}
                            <div className="mt-[0.5rem] flex h-full w-full flex-col items-center justify-start">
                                <div className=" grid grid-cols-2 grid-rows-4 gap-2 self-end">
                                    <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                        Tổng tiền:
                                    </p>
                                    <p className="font-sans text-[1rem] text-[#111928]">
                                        {formatCurrency(checkouts.totalPrice)}
                                    </p>
                                    <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                        Nhập voucher:
                                    </p>
                                    <input
                                        type="text"
                                        value={voucher}
                                        onChange={(e) => {
                                            setVoucher(e.target.value);
                                        }}
                                        maxLength={11}
                                        placeholder="Nhập voucher"
                                        className="rounded-md border-b border-[#DFE4EA] focus:outline-none focus:ring-0"
                                    />
                                    <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                        Nhập số điện thoại khách hàng:
                                    </p>
                                    <input
                                        type="text"
                                        maxLength={11}
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        placeholder="Nhập số điện thoại"
                                        className="rounded-md border-b border-[#DFE4EA] focus:outline-none focus:ring-0"
                                    />
                                    <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                        Nhập số bàn:
                                    </p>
                                    <input
                                        type="number"
                                        value={tableData}
                                        onChange={(e) => {
                                            setTableData(parseInt(e.target.value, 10));
                                        }}
                                        placeholder="Nhập số bàn"
                                        className="rounded-md border-b border-[#DFE4EA] focus:outline-none focus:ring-0"
                                    />
                                    <button
                                        type="button"
                                        className="h-[3.125rem] w-[11.875rem] rounded-md bg-[#12582E] px-[1.75rem] py-[0.81rem] font-sans font-medium text-white"
                                        onClick={() => {
                                            handleCheckout();
                                        }}
                                    >
                                        Tiếp tục
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pay bill modal */}
            {showPayBillModal && (
                <div
                    className="relative z-10 flex items-center justify-center overflow-hidden"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 backdrop-blur-lg" />
                    <div className="fixed inset-0 z-10 w-screen">
                        <div className="flex h-full w-full items-center justify-center">
                            <div
                                className="relative flex h-fit
w-[59.5rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pb-[0.56rem] pl-[1.62rem] pr-[1rem] pt-[0.56rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                            >
                                {/* close button */}
                                <button
                                    type="button"
                                    className="absolute right-5 top-5"
                                    onClick={() => {
                                        setShowPayBillModal(false);
                                        setShowDetailCheckoutModal(false);
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
                                {/* Product name and price */}
                                <p className="font-sans text-[1.5rem] font-bold">
                                    {" "}
                                    Phiếu thanh toán
                                </p>
                                {/* Billing info */}
                                <div className="flex h-full w-full flex-col justify-start">
                                    <div
                                        className="mt-[0.75rem] h-[18.5rem] overflow-x-hidden overflow-y-scroll
rounded-[0.625rem] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.08)]"
                                    >
                                        <table className="w-full text-left rtl:text-right">
                                            <thead className="h-[3.75rem] border-b border-[#EEE] bg-[#D9D9D9] font-sans text-[0.9375rem] font-normal text-[#111928]">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                    >
                                                        DANH SÁCH
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                    />
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                    />
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                                    />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Product item */}
                                                {checkouts.items.map((item: CheckoutItem) => (
                                                    <tr
                                                        key={item.productID}
                                                        className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                                    >
                                                        <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                            {item.productID}
                                                        </td>
                                                        <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                            {productName(item.productID)}
                                                        </td>
                                                        <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                            {item.quantity}
                                                        </td>

                                                        <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                            {formatCurrency(item.unit_price)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Total price */}
                                <div className="mt-[0.5rem] flex h-fit w-full flex-col items-center justify-start">
                                    <div className=" grid h-fit grid-cols-2 grid-rows-7 gap-[0.5rem] self-end">
                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Tổng tiền:
                                        </p>
                                        <p className="font-sans text-[1rem] text-[#111928]">
                                            {formatCurrency(checkouts.totalPrice)}
                                        </p>
                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Số bàn:
                                        </p>
                                        <p className=" font-sans text-[1rem] text-[#111928]">
                                            {checkouts.tableNumber}
                                        </p>

                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Voucher:
                                        </p>
                                        <p className=" font-sans text-[1rem] text-[#111928]">
                                            {voucherCode || "Không có"}
                                        </p>

                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Giảm giá:
                                        </p>
                                        <p className="font-sans text-[1rem] text-[#111928]">
                                            {formatCurrency(checkouts.discountPrice) || 0}
                                        </p>

                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Số điện thoại:
                                        </p>
                                        <p className="font-sans text-[1rem] text-[#111928]">
                                            {checkouts.customerPhone || "Không có"}
                                        </p>

                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Khách cần trả:
                                        </p>
                                        <p className="font-sans text-[1rem] text-[#111928]">
                                            {checkouts.discountPrice !== 0
                                                ? formatCurrency(
                                                      checkouts.totalPrice -
                                                          checkouts.discountPrice,
                                                  )
                                                : formatCurrency(checkouts.totalPrice)}
                                        </p>
                                        <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                            Khách đưa:
                                        </p>
                                        <div>
                                            <input
                                                type="text"
                                                value={money}
                                                readOnly={returnMoney !== ""}
                                                onChange={handleMoney}
                                                placeholder="Nhập số tiền khách đưa"
                                                className="rounded-md border-b border-[#DFE4EA] focus:outline-none focus:ring-0"
                                            />
                                        </div>
                                        {returnMoney ? (
                                            <>
                                                <p className="font-sans text-[1rem] font-bold text-[#111928]">
                                                    Tiền thừa:
                                                </p>
                                                <p className="font-sans text-[1rem] text-[#111928]">
                                                    {returnMoney}
                                                </p>
                                            </>
                                        ) : null}
                                        <button
                                            type="button"
                                            className="h-[3.125rem] w-[11.875rem] rounded-md bg-[#005B6F] px-[1.75rem] py-[0.81rem] font-sans font-medium text-white"
                                            onClick={() => {
                                                handleReturnMoney();
                                            }}
                                        >
                                            Thành tiền
                                        </button>
                                        <button
                                            type="button"
                                            className="h-[3.125rem] w-[11.875rem] rounded-md bg-[#12582E] px-[1.75rem] py-[0.81rem] font-sans font-medium text-white"
                                            onClick={() => {
                                                if (disableContinue) {
                                                    dispatch(
                                                        setError(
                                                            "Vui lòng thực hiện tính tiền trước",
                                                        ),
                                                    );
                                                    return;
                                                }
                                                handleFinishCheckout();
                                            }}
                                        >
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
