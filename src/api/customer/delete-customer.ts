import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { removeCustomer, removeSelectedCustomer } from "@/redux/slices/customer-slice";

export default async function DeleteCustomer(
    customerID: number,
    setShowDeleteCustomerModal: (showDeleteCustomerModal: boolean) => void,
    setShowCustomerDetail: (showCustomerDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/customers/${customerID}`, {
            _method: "DELETE",
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xoá khách hàng thành công"));
            dispatch(removeSelectedCustomer(customerID));
            dispatch(removeCustomer(customerID));
            setShowDeleteCustomerModal(false);
            setShowCustomerDetail(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            setShowDeleteCustomerModal(false);
        } else {
            throw new Error("Có lỗi xảy ra khi xoá khách hàng");
        }
    } catch (error) {
        dispatch(setError("Có lỗi xảy ra khi xoá khách hàng"));
        setShowDeleteCustomerModal(false);
    }
}
