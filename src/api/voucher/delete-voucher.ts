import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeVoucher, removeSelectedVoucher } from "@/redux/slices/voucher-slice";

export default async function DeleteVoucher(
    voucherCode: string,
    setShowDeleteVoucherModal: (showDeleteVoucherModal: boolean) => void,
    setShowVoucherDetail: (showVoucherDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/vouchers/${voucherCode}`, {
            _method: "DELETE",
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xoá voucher thành công"));
            dispatch(removeSelectedVoucher(Number(voucherCode)));
            dispatch(removeVoucher(Number(voucherCode)));
            setShowDeleteVoucherModal(false);
            setShowVoucherDetail(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            setShowDeleteVoucherModal(false);
        } else {
            throw new Error("Có lỗi xảy ra khi xoá voucher");
        }
    } catch (error) {
        dispatch(setError("Có lỗi xảy ra khi xoá voucher"));
        setShowDeleteVoucherModal(false);
    }
}
