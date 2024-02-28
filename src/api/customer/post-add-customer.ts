import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { addCustomer } from "@/redux/slices/customer-slice";

export default async function PostAddCustomer(
    name: string,
    phone_number: string,
    setShowAddCustomerModal: (showAddCustomerModal: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post("/customers", {
            name,
            phone_number,
        });
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(
                addCustomer({
                    id: res.data.id,
                    name: res.data.name,
                    phone_number: res.data.phone_number,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                }),
            );
            dispatch(setSuccess("Thêm khách hàng thành công"));
            setShowAddCustomerModal(false);
            // Update customer list after add new customer after 3s
            // setTimeout(() => {
            //     window.location.reload();
            // }, 3000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi thêm khách hàng");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi thêm khách hàng"));
    }
}
