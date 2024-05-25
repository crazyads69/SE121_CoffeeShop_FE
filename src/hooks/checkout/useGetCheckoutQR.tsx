import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CheckoutItem, CheckoutList } from "@/redux/slices/checkout-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export default function useGetCheckoutQR() {
    const [qrCode, setQrCode] = useState<string>("");
    const [isLoadingQR, setIsLoadingQR] = useState<boolean>(false);
    const [checkoutId, setCheckoutId] = useState<string>("");
    const dispatch = useDispatch();
    const checkouts = useSelector((state: RootState) => state.checkout.checkoutList);

    const fetchCheckoutQR = async (voucherCode: string, tableData: number, phone: string) => {
        try {
            setIsLoadingQR(true);
            // Get checkout items
            const { items, note } = checkouts;
            // Create cart object contain productID and quantity
            const cart = items.map((item: CheckoutItem) => ({
                product_id: item.productID,
                quantity: item.quantity,
            }));
            // Create checkout object
            const checkout = {
                cart,
                voucher_code: voucherCode,
                customer_phone_number: phone,
                table_number: tableData,
                note,
            };
            const res = await axiosClient.post("/invoices/get-qr", checkout);
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                setQrCode(res.data.qr);
                setCheckoutId(res.data.random_code);
            } else if (res.data.message) {
                dispatch(setError(res.data.message));
            } else {
                throw new Error("Xảy ra lỗi khi tạo mã QR");
            }
        } catch (error) {
            dispatch(setError("Xảy ra lỗi khi tạo mã QR"));
        } finally {
            setIsLoadingQR(false);
        }
    };

    return { qrCode, isLoadingQR, fetchCheckoutQR, checkoutId, setCheckoutId, setQrCode };
}
