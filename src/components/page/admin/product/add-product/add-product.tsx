/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { clearMessage, setError } from "@/redux/slices/alert-slice";
import PostAddProduct from "@/api/product/post-add-product";
import { productTypes } from "@/utils/constant/constant";
import { formatCurrency } from "@/utils/custom-functions/custom-functions";

interface AddProductProps {
    setShowAddProductModal: (showAddProductModal: boolean) => void;
}

export default function AddProduct({ setShowAddProductModal }: AddProductProps) {
    const dispatch = useDispatch();
    // State for upload image file
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [filePath, setFilePath] = useState<string>("");
    const products = useSelector((state: RootState) => state.product.products);
    // State for each product field
    const [productName, setProductName] = useState<string>("");
    const [productType, setProductType] = useState<string>(productTypes[0]);
    const [productPrice, setProductPrice] = useState<string>("");
    // State for preview image URL
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // State for show product type dropdown
    const [showProductTypeDropdown, setShowProductTypeDropdown] = useState<boolean>(false);
    // State for error input
    const [errorProductName, setErrorProductName] = useState<boolean>(false);
    const [errorProductPrice, setErrorProductPrice] = useState<boolean>(false);

    // useRef for type dropdown
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputPriceRef = useRef<HTMLInputElement>(null);

    // Add event listener for click outside type dropdown
    useEffect(() => {
        // Handle click outside type dropdown
        const handleClickOutside = (e: MouseEvent) => {
            // If click outside type dropdown then close it
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
                setShowProductTypeDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [typeDropdownRef]);
    // Handle remove error input when user type using ref
    useEffect(() => {
        if (errorProductPrice && inputPriceRef.current) {
            inputPriceRef.current.addEventListener("input", () => {
                setErrorProductPrice(false);
            });
        }
    }, [errorProductPrice]);
    // Handle remove error input when user type using ref
    useEffect(() => {
        if (errorProductName && inputNameRef.current) {
            inputNameRef.current.addEventListener("input", () => {
                setErrorProductName(false);
            });
        }
    }, [errorProductName]);

    // Set timeout for error
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (errorProductName) setErrorProductName(false);
            if (errorProductPrice) setErrorProductPrice(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [errorProductName, errorProductPrice]);

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Check if already have image file then remove it
        if (imageFile) {
            setImageFile(null);
            setFilePath("");
            setPreviewImage(null);
        }
        // Get image file
        const file = e.target.files?.[0];
        // Check if user cancel file picker then do nothing
        if (!file) return;
        // Check if file size is too large
        if (file.size > 1024 * 1024 * 2) {
            dispatch(setError("Kích thước ảnh quá lớn"));
            return;
        }
        // Get image full path
        if (file) {
            setImageFile(file);
            setFilePath(e.target.value);
            // Convert image file to URL Mime type
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Handle product name
    const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    // Handle product type

    // Handle product price
    const handleProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow number input
        const inputPrice = e.target.value.replace(/\D/g, "");
        // If input is empty, set product price to empty string to prevent error NaN when format
        // currency else format input price to currency format
        const formattedPrice = inputPrice === "" ? "" : formatCurrency(parseInt(inputPrice, 10));
        setProductPrice(formattedPrice);
    };

    // Handle save product
    const handleSaveProduct = async () => {
        // Check if exist empty field then show error and do nothing
        if (productName === "" || productPrice === "") {
            dispatch(setError("Vui lòng điền đầy đủ thông tin!"));
            // Set error input for empty field
            if (productName === "") setErrorProductName(true);
            if (productPrice === "") setErrorProductPrice(true);
            return;
        }
        const price = parseInt(productPrice.replace(/\D/g, ""), 10);
        // Call API to add product
        await PostAddProduct(
            imageFile,
            productName,
            productType,
            price,
            dispatch,
            setShowAddProductModal,
        );
    };
    return (
        <div
            className="relative z-10 flex items-center justify-start overflow-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 backdrop-blur-lg" />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex h-full items-center justify-center">
                    <div
                        className="relative flex
h-[36.3125rem] w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pt-[1.25rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowAddProductModal(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M13.2001 12L22.3501 2.84998C22.6876 2.51248 22.6876 1.98748 22.3501 1.64998C22.0126 1.31248 21.4876 1.31248 21.1501 1.64998L12.0001 10.8L2.8501 1.64998C2.5126 1.31248 1.9876 1.31248 1.6501 1.64998C1.3126 1.98748 1.3126 2.51248 1.6501 2.84998L10.8001 12L1.6501 21.15C1.3126 21.4875 1.3126 22.0125 1.6501 22.35C1.8001 22.5 2.0251 22.6125 2.2501 22.6125C2.4751 22.6125 2.7001 22.5375 2.8501 22.35L12.0001 13.2L21.1501 22.35C21.3001 22.5 21.5251 22.6125 21.7501 22.6125C21.9751 22.6125 22.2001 22.5375 22.3501 22.35C22.6876 22.0125 22.6876 21.4875 22.3501 21.15L13.2001 12Z"
                                    fill="#111928"
                                />
                            </svg>
                        </button>
                        {/* Modal title */}
                        <div
                            className="flex h-[3.125rem] w-[53.9375rem] flex-row
items-center justify-start border-b border-[#000000] pl-[1rem] py-[0.69rem]"
                        >
                            <h1 className="font-sans text-[1rem] font-bold">Thêm hàng hoá</h1>
                        </div>
                        {/* Product info */}
                        <div className="flex w-full flex-row items-start justify-start pb-[8.81rem] pl-[4.75rem] pt-[2.88rem]">
                            {/* Upload image */}
                            <div className="relative">
                                <img
                                    src={`${previewImage !== null ? previewImage : "/images/upload_image.jpg"}
                                    `}
                                    alt="upload_image"
                                    className="relative h-[13.375rem] w-[10.375rem]"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-2 right-2 inline-flex h-[1.875rem] w-[1.9375rem] items-center justify-center
rounded-md bg-white"
                                    onClick={() => {
                                        const uploadInput = document.getElementById(
                                            "upload-input",
                                        ) as HTMLInputElement;
                                        uploadInput.click();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="22"
                                        viewBox="0 0 23 22"
                                        fill="none"
                                    >
                                        <path
                                            d="M21.8625 15.45C21.4125 15.45 21 15.825 21 16.3125V19.65C21 19.9875 20.7375 20.25 20.4 20.25H2.325C1.9875 20.25 1.725 19.9875 1.725 19.65V16.3125C1.725 15.825 1.3125 15.45 0.8625 15.45C0.4125 15.45 0 15.825 0 16.3125V19.65C0 20.925 1.0125 21.9375 2.2875 21.9375H20.4C21.675 21.9375 22.6875 20.925 22.6875 19.65V16.3125C22.725 15.825 22.3125 15.45 21.8625 15.45Z"
                                            fill="#111928"
                                        />
                                        <path
                                            d="M6.5249 6.7125L10.5374 2.8125V15.7875C10.5374 16.2375 10.9124 16.65 11.3999 16.65C11.8499 16.65 12.2624 16.275 12.2624 15.7875V2.8125L16.2749 6.7125C16.4249 6.8625 16.6499 6.9375 16.8749 6.9375C17.0999 6.9375 17.3249 6.8625 17.4749 6.675C17.8124 6.3375 17.7749 5.8125 17.4749 5.475L11.9624 0.225C11.6249 -0.075 11.0999 -0.075 10.7999 0.225L5.3249 5.5125C4.9874 5.85 4.9874 6.375 5.3249 6.7125C5.6624 7.0125 6.1874 7.05 6.5249 6.7125Z"
                                            fill="#111928"
                                        />
                                    </svg>
                                </button>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="upload-input"
                                    accept="image/jpg, image/png, image/jpeg"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            {/* Product info */}
                            <div className="ml-[3.5rem] flex flex-col items-start justify-start">
                                {/* Product INPUT */}
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    {/* Product delete and Product update button */}

                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Tên hàng hoá:
                                    </h1>
                                    <input
                                        type="text"
                                        ref={inputNameRef}
                                        value={productName}
                                        onChange={handleProductName}
                                        maxLength={255}
                                        placeholder="Nhập tên hàng hoá"
                                        className={`col-start-2 rounded-md border ${
                                            errorProductName ? "border-red-500" : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] px-[1.25rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />
                                    <h1 className="font-sans text-[1rem] font-medium">Giá bán: </h1>
                                    <input
                                        type="text"
                                        ref={inputPriceRef}
                                        value={productPrice}
                                        onChange={handleProductPrice}
                                        maxLength={255}
                                        placeholder="Nhập giá bán hàng hoá"
                                        className={`col-start-2 rounded-md border ${
                                            errorProductPrice
                                                ? "border-red-500"
                                                : "border-[#DFE4EA]"
                                        } bg-white py-[0.75rem] px-[1.25rem] placeholder:text-[rgba(0,0,0,0.55)]`}
                                    />

                                    <h1 className="font-sans text-[1rem] font-medium">
                                        Loại hàng:
                                    </h1>
                                    <button
                                        type="button"
                                        className="relative col-start-2 inline-flex cursor-pointer items-center justify-between rounded-md border border-[#DFE4EA] bg-white px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                        onClick={() => {
                                            setShowProductTypeDropdown(true);
                                        }}
                                    >
                                        {productType}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="6"
                                            viewBox="0 0 12 6"
                                            fill="none"
                                        >
                                            <path
                                                d="M6.0001 5.97495C5.86885 5.97495 5.75947 5.9312 5.6501 5.8437L0.618848 0.899951C0.421973 0.703076 0.421973 0.396826 0.618848 0.199951C0.815723 0.00307633 1.12197 0.00307633 1.31885 0.199951L6.0001 4.77183L10.6813 0.156201C10.8782 -0.0406738 11.1845 -0.0406738 11.3813 0.156201C11.5782 0.353076 11.5782 0.659326 11.3813 0.856201L6.3501 5.79995C6.24072 5.90933 6.13135 5.97495 6.0001 5.97495Z"
                                                fill="#111928"
                                            />
                                        </svg>
                                    </button>
                                    {/* Product type dropdown */}
                                    {showProductTypeDropdown && (
                                        <div
                                            ref={typeDropdownRef}
                                            className="absolute right-[9.5rem] top-[18rem] z-10 flex w-[11.625rem] flex-col rounded-md bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]"
                                        >
                                            {productTypes.map((type) => (
                                                <button
                                                    type="button"
                                                    key={type}
                                                    className="inline-flex w-full items-center justify-start px-[1.12rem] py-[0.62rem] hover:bg-gray-200"
                                                    onClick={() => {
                                                        setProductType(type);
                                                        setShowProductTypeDropdown(false);
                                                    }}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Product save button */}
                                <button
                                    type="button"
                                    onClick={handleSaveProduct}
                                    className="mt-[3.37em] inline-flex h-[3.125rem] w-[11.875rem] items-center justify-center rounded-md border border-[#DFE4EA] bg-[#12582E] px-[1.75rem] py-[0.81rem] font-sans text-white"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
