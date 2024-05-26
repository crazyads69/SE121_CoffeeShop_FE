import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/slices/alert-slice";
import axiosClient from "@/utils/axios-client/axios-client";

interface TopProductResponse {
    [key: string]: number;
}

export interface TopProductData {
    label: string;
    value: number;
}

export default function useGetTopProduct() {
    const [topProducts, setTopProducts] = useState<TopProductData[]>([]);
    const [isLoadingTopProduct, setIsLoadingTopProduct] = useState<boolean>(false);
    const dispatch = useDispatch();

    const fetchTopProduct = async (startDate: Date | null, endDate: Date | null) => {
        try {
            setIsLoadingTopProduct(true);
            // Call API here
            const startDateUnix = startDate ? Math.floor(startDate.getTime() / 1000) : 1704088800; // 1/1/2024
            const endDateUnix = endDate ? Math.floor(endDate.getTime() / 1000) : 1735711200; // 1/1/2025
            const res = await axiosClient.get(
                `/dashboard/top-product-by-time?start_date=${startDateUnix}&end_date=${endDateUnix}`,
            );
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                const topProductsData: TopProductData[] = [];
                const { data } = res;
                Object.entries(data).forEach(([key, value]) => {
                    topProductsData.push({ label: key, value: value as number });
                });
                setTopProducts(topProductsData);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Có lỗi khi lấy dữ liệu sản phẩm bán chạy");
            }
        } catch (error) {
            dispatch(setError("Có lỗi khi lấy dữ liệu sản phẩm bán chạy"));
        } finally {
            setIsLoadingTopProduct(false);
        }
    };

    return { topProducts, isLoadingTopProduct, fetchTopProduct };
}
