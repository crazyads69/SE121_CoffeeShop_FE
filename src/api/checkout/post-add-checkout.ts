import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import {
    CheckoutItem,
    CheckoutList,
    clearCheckoutList,
    updateCustomerPhone,
    updateDiscountPrice,
    updateVoucherCode,
} from "@/redux/slices/checkout-slice";

export default async function PostAddCheckout(
    checkouts: CheckoutList,
    setVoucher: (voucher: string) => void,
    setPhone: (phone: string) => void,
    setMoney: (money: string) => void,
    setReturnMoney: (returnMoney: string) => void,
    setShowPayBillModal: (showPayBillModal: boolean) => void,
    setShowDetailCheckoutModal: (showDetailCheckoutModal: boolean) => void,
    setTimer: (timer: number) => void,
    setTimerDetail: (timerDetail: string) => void,
    setCheckoutId: (checkoutId: string) => void,
    setQrCode: (qrCode: string) => void,
    dispatch: Dispatch<AnyAction>,
) {
    // Get total price
    const { totalPrice } = checkouts;
    // Get discount price
    const { discountPrice } = checkouts;

    // Get checkout items
    const { items } = checkouts;
    // Get voucher code
    const { voucherCode } = checkouts;
    // Get customer phone
    const { customerPhone } = checkouts;
    // Get table number
    const { tableNumber } = checkouts;
    const { note } = checkouts;
    // Create cart object contain productID and quantity
    const cart = items.map((item: CheckoutItem) => ({
        product_id: item.productID,
        quantity: item.quantity,
    }));
    // Create checkout object
    const checkout = {
        cart,
        voucher_code: voucherCode,
        customer_phone_number: customerPhone,
        table_number: tableNumber,
        note,
    };
    try {
        const res = await axiosClient.post("/invoices", checkout);
        if (res.status === 200) {
            dispatch(setSuccess("Thanh toán thành công"));
            // Reset checkout state
            // Reset checkout items
            dispatch(clearCheckoutList());
            dispatch(updateVoucherCode(null));
            dispatch(updateCustomerPhone(null));
            dispatch(updateDiscountPrice(0));
            // Reset voucher and phone input
            setVoucher("");
            setPhone("");
            // Reset money input
            setMoney("");
            // Reset return money
            setReturnMoney("");
            setTimer(0);
            setTimerDetail("");
            setCheckoutId("");
            setQrCode("");
            // Close pay bill modal
            setShowPayBillModal(false);
            // Close checkout detail modal
            setShowDetailCheckoutModal(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            // Reset checkout state
            // Reset checkout state
            // Reset checkout items
            dispatch(clearCheckoutList());
            dispatch(updateVoucherCode(null));
            dispatch(updateCustomerPhone(null));
            dispatch(updateDiscountPrice(0));
            setTimer(0);
            setTimerDetail("");
            setCheckoutId("");
            setQrCode("");
            // Reset voucher and phone input
            setVoucher("");
            setPhone("");
            // Reset money input
            setMoney("");
            // Reset return money
            setReturnMoney("");
            // Close pay bill modal
            setShowPayBillModal(false);
            // Close checkout detail modal
            setShowDetailCheckoutModal(false);
        } else {
            throw new Error("Thanh toán thất bại");
        }
    } catch (error) {
        dispatch(setError("Thanh toán thất bại"));
        // Reset checkout state
        // Reset checkout items
        dispatch(clearCheckoutList());
        dispatch(updateVoucherCode(null));
        dispatch(updateCustomerPhone(null));
        dispatch(updateDiscountPrice(0));
        setTimer(0);
        setTimerDetail("");
        setCheckoutId("");
        setQrCode("");
        // Reset voucher and phone input
        setVoucher("");
        setPhone("");
        // Reset money input
        setMoney("");
        // Reset return money
        setReturnMoney("");
        // Close pay bill modal
        setShowPayBillModal(false);
        // Close checkout detail modal
        setShowDetailCheckoutModal(false);
    }
}
