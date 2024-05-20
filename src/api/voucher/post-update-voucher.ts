import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { Voucher, updateVoucher } from "@/redux/slices/voucher-slice";

export default async function PostUpdateVoucher(
    voucherCode: string,
    type: string,
    amount: number,
    quantity: number,
    start_date: string,
    end_date: string,
    voucher: Voucher,
    setShowUpdateVoucherModal: (show: boolean) => void,
    setShowVoucherDetail: (show: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/vouchers/${voucher.id}`, {
            voucher_code: voucherCode,
            type,
            amount,
            quantity,
            start_date,
            end_date,
            _method: "PUT",
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(updateVoucher(res.data));
            dispatch(setSuccess("Cập nhật voucher thành công"));
            setShowUpdateVoucherModal(false);
            setShowVoucherDetail(false);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi cập nhật voucher");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi cập nhật voucher"));
    }
}
