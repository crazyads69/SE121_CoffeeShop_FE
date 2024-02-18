import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeVoucherList, clearSelectedVouchers } from "@/redux/slices/voucher-slice";

export default async function DeleteVouchers(
    selectedVoucherList: string[],
    setShowDeleteVoucherModal: (showDeleteVoucherModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/vouchers/bulk-delete", {
            _method: "DELETE",
            ids: selectedVoucherList,
        });
        if (res.status === 204) {
            dispatch(removeVoucherList(selectedVoucherList));
            dispatch(clearSelectedVouchers());
            dispatch(setSuccess("Xoá voucher thành công"));
            setShowDeleteVoucherModal(false);
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
