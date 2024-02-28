import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError, setSuccess } from "@/redux/slices/alert-slice";
import { Product, updateProduct } from "@/redux/slices/product-slice";

export default async function PostUpdateProduct(
    product_id: string,
    imageFile: File | null,
    productName: string,
    unitPrice: number,
    product: Product,
    setShowUpdateProductModal: (showUpdateProductModal: boolean) => void,
    setShowProductDetail: (showProductDetail: boolean) => void,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await axiosClient.post(
            `/products/${product_id}`,
            { name: productName, unit_price: unitPrice, image: imageFile, _method: "PUT" },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        if (res.status === 200 || res.status === 201) {
            dispatch(setSuccess("Cập nhật sản phẩm thành công!"));
            // Update product list in redux
            dispatch(
                updateProduct({
                    ...product,
                    name: productName,
                    unit_price: unitPrice,
                    image: res.data.image,
                }),
            );
            // Close modal
            setShowUpdateProductModal(false);
            setShowProductDetail(false);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        } else if (res.data.message) {
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Cập nhật sản phẩm thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật sản phẩm thất bại!"));
    }
}
