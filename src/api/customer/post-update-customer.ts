import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { Customer, updateCustomer } from "@/redux/slices/customer-slice";

export default async function PostUpdateCustomer(
    customer_id: number,
    name: string,
    phone: string,
    customer: Customer,
    setShowUpdateCustomerModal: (showUpdateCustomerModal: boolean) => void,
    setShowCustomerDetail: (showCustomerDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/customers/${customer_id}`, {
            name,
            phone_number: phone,
            _method: "PUT",
        });
        if (res.status === 200 || res.status === 201) {
            dispatch(setSuccess("Cập nhật khách hàng thành công!"));
            // Update customer list in redux
            dispatch(
                updateCustomer({
                    ...customer,
                    name,
                    phone_number: phone,
                }),
            );
            // Close modal
            setShowUpdateCustomerModal(false);
            setShowCustomerDetail(false);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Cập nhật khách hàng thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật khách hàng thất bại!"));
    }
}
