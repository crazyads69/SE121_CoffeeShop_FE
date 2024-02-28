import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { addVoucher } from "@/redux/slices/voucher-slice";

export default async function PostAddVoucher(
    voucherCode: string,
    type: string,
    amount: number,
    quantity: number,
    start_date: string,
    end_date: string,
    setShowAddVoucherModal: (show: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/vouchers", {
            voucher_code: voucherCode,
            type,
            amount,
            quantity,
            start_date,
            end_date,
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(setSuccess("Thêm voucher thành công"));
            dispatch(
                addVoucher({
                    id: res.data.id,
                    voucher_code: res.data.voucher_code,
                    type: res.data.type,
                    amount: res.data.amount,
                    quantity: res.data.quantity,
                    start_date: res.data.start_date,
                    end_date: res.data.end_date,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                }),
            );
            setShowAddVoucherModal(false);
            // Update voucher list after add new voucher after 3s
            // setTimeout(() => {
            //     window.location.reload();
            // }, 3000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi thêm voucher");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi thêm voucher"));
    }
}
