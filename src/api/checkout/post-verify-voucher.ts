import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import {
    updateDiscountPrice,
    updateVoucherCode,
    updateTableNumber,
    CheckoutList,
} from "@/redux/slices/checkout-slice";

export default async function PostVerifyVoucher(
    voucherCode: string,
    tableData: number,
    checkouts: CheckoutList,
    setShowPayBillModal: (showPayBillModal: boolean) => void,
    setVoucher: (voucher: string) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/vouchers-verify", { voucher_code: voucherCode });
        if (res.status === 200 && res.data.is_available) {
            dispatch(setSuccess("Verify voucher thành công"));
            // check type of voucher
            if (res.data.voucher_type === "percent") {
                // Get discount price
                dispatch(
                    updateDiscountPrice((res.data.voucher_amount * checkouts.totalPrice) / 100),
                );
            } else {
                // Get discount price
                dispatch(updateDiscountPrice(res.data.voucher_amount));
            }
            dispatch(updateVoucherCode(voucherCode));
            // Update table data
            dispatch(updateTableNumber(tableData));
            // Show pay bill modal
            setShowPayBillModal(true);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            dispatch(updateVoucherCode(null));
            setVoucher("");
        } else {
            throw new Error("Voucher không hợp lệ hoặc đã hết hạn");
        }
    } catch (error) {
        dispatch(updateVoucherCode(null));
        setVoucher("");
        dispatch(setError("Voucher không hợp lệ hoặc đã hết hạn"));
    }
}
