import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import {
    removeAllSelectedCustomers,
    removeCustomer,
    removeCustomerList,
} from "@/redux/slices/customer-slice";

export default async function DeleteCustomers(
    selectedCustomerList: string[],
    setShowDeleteCustomerModal: (showDeleteCustomerModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/customers/bulk-delete", {
            _method: "DELETE",
            ids: selectedCustomerList,
        });
        if (res.status === 204) {
            dispatch(removeAllSelectedCustomers());
            dispatch(removeCustomerList(selectedCustomerList));
            dispatch(setSuccess("Xoá khách hàng thành công"));
            setShowDeleteCustomerModal(false);
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
