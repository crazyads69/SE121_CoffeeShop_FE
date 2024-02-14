import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { removeAllSelectedProducts } from "@/redux/slices/product-slice";

export default async function DeleteProducts(
    selectProductList: string[],
    dispatch: Dispatch<AnyAction>,
    setShowDeleteProductModal: (showDeleteProductModal: boolean) => void,
) {
    try {
        const res = await axiosClient.post("/products/bulk-delete", {
            _method: "DELETE",
            ids: selectProductList,
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xóa sản phẩm thành công"));
            dispatch(removeAllSelectedProducts(selectProductList));
            setShowDeleteProductModal(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            setShowDeleteProductModal(false);
        } else {
            throw new Error("Đã có lỗi khi xóa sản phẩm");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi khi xóa sản phẩm"));
        setShowDeleteProductModal(false);
    }
}
