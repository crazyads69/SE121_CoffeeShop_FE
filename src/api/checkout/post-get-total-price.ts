/* eslint-disable no-shadow */
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
    CheckoutItem,
    CheckoutList,
    clearCheckoutList,
    updateCustomerPhone,
    updateDiscountPrice,
    updateTableNumber,
    updateVoucherCode,
} from "@/redux/slices/checkout-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";

export default async function PostGetTotalPrice(
    checkouts: CheckoutList,
    voucherCode: string,
    tableData: number,
    phone: string,
    setVoucher: (voucher: string) => void,
    setPhone: (phone: string) => void,
    setMoney: (money: string) => void,
    setReturnMoney: (returnMoney: string) => void,
    setShowPayBillModal: (showPayBillModal: boolean) => void,
    setShowDetailCheckoutModal: (showDetailCheckoutModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        // Get checkout items
        const { items, note } = checkouts;
        // Create cart object contain productID and quantity
        const cart = items.map((item: CheckoutItem) => ({
            product_id: item.productID,
            quantity: item.quantity,
        }));
        // Create checkout object
        const checkout = {
            cart,
            voucher_code: voucherCode,
            customer_phone_number: phone,
            table_number: tableData,
            note,
        };
        const res = await axiosClient.post("/invoices/get-total-price", checkout);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            dispatch(setSuccess("Tính tiền thành công"));
            dispatch(updateVoucherCode(voucherCode));
            dispatch(updateDiscountPrice(checkouts.totalPrice - res.data.total_price)); // Server handle discount automatically so only need to calculate the difference
            // Update table data
            setMoney(res.data.total_price);
            dispatch(updateTableNumber(tableData));
            // Show pay bill modal
            setShowPayBillModal(true);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            // Reset checkout state
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
            // Close pay bill modal
            setShowPayBillModal(false);
            // Close checkout detail modal
            setShowDetailCheckoutModal(false);
        } else {
            throw new Error("Tính tiền thất bại");
        }
    } catch (error) {
        dispatch(setError("Tính tiền thất bại"));
        // Reset checkout state
        // Reset checkout state
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
        // Close pay bill modal
        setShowPayBillModal(false);
        // Close checkout detail modal
        setShowDetailCheckoutModal(false);
    }
}
