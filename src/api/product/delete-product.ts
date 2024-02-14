import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setSuccess, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { removeProduct, removeSelectedProduct } from "@/redux/slices/product-slice";

export default async function DeleteProduct(
    productCode: string,
    setShowDeleteProductModal: (showDeleteProductModal: boolean) => void,
    setShowProductDetail: (showProductDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(`/products/${productCode}`, {
            _method: "DELETE",
        });
        if (res.status === 204) {
            dispatch(setSuccess("Xoá sản phẩm thành công"));
            dispatch(removeProduct(productCode));
            dispatch(removeSelectedProduct(productCode));
            setShowDeleteProductModal(false);
            setShowProductDetail(false);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
            setShowDeleteProductModal(false);
        } else {
            throw new Error("Xoá sản phẩm thất bại !");
        }
    } catch (error) {
        dispatch(setError("Xoá sản phẩm thất bại !"));
        setShowDeleteProductModal(false);
    }
}
