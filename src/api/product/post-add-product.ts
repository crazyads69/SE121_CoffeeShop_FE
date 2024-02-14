import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";

export default async function PostAddProduct(
    image: File | null,
    name: string,
    type: string,
    unitPrice: number,
    dispatch: Dispatch<AnyAction>,
    setShowAddProductModal: (showAddProductModal: boolean) => void,
) {
    try {
        const res = await axiosClient.post(
            "/products",
            {
                image,
                name,
                type,
                unit_price: unitPrice,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        if (res.status === 201 || res.status === 200 || res.status === 204) {
            dispatch(setSuccess("Thêm sản phẩm thành công"));
            setShowAddProductModal(false);
            // Update product list after add new product after 3s
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Đã có lỗi khi thêm sản phẩm");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi thêm sản phẩm"));
    }
}
