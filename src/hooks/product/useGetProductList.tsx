import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessage, setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { Product, setProducts } from "@/redux/slices/product-slice";

export default function useGetProductList() {
    const [isLoadingProductList, setIsLoadingProductList] = useState<boolean>(true);
    const [productList, setProductList] = useState<Product[]>([]);
    const dispatch = useDispatch();

    const fetchProductList = async (page: number) => {
        try {
            const res = await axiosClient.get(`/products?page=${page}`);
            if (res.status === 200) {
                setProductList(res.data.data);
                dispatch(setProducts(res.data.data));
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Đã có lỗi khi lấy dữ liệu sản phẩm");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi khi lấy dữ liệu sản phẩm"));
        } finally {
            setIsLoadingProductList(false);
        }
    };

    return { isLoadingProductList, productList, fetchProductList };
}
