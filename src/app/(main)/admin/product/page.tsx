/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import useGetProductTotalPage from "@/hooks/product/useGetProductTotalPage";
import useGetProductList from "@/hooks/product/useGetProductList";
import { Product } from "@/redux/slices/product-slice";
import fuzzyMatch from "@/utils/custom-functions/custom-functions";
import LoadingPage from "@/components/global/loading/LoadingPage";
import Pagination from "@/components/global/pagination/pagination";
import ProductTable from "@/components/page/admin/product/product-table/product-table";
import ProductType from "@/components/page/admin/product/product-type/product-type";
import SearchProduct from "@/components/page/admin/product/search-product/search-product";

export default function Page() {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>("");
    const [productType, setProductType] = useState<string>("");
    const [filterProductsList, setFilterProductsList] = useState<Product[]>([]);
    const products = useSelector((state: RootState) => state.product.products);
    const { totalPage, fetchTotalPage } = useGetProductTotalPage();
    const { isLoadingProductList, fetchProductList } = useGetProductList();
    // Filter product list by search value
    const filterProductsBySearchValue = (products: Product[], searchValue: string) => {
        return products.filter((product) => {
            return fuzzyMatch(searchValue, product.id) || fuzzyMatch(searchValue, product.name);
        });
    };
    const filterProductsByType = (products: Product[], productType: string) => {
        return products.filter((product) => {
            return product.type === productType;
        });
    };
    useEffect(() => {
        fetchTotalPage();
        fetchProductList(activePage);
    }, [activePage]);

    useEffect(() => {
        // Filter product list by search value
        let newFilterProductsList = products;
        newFilterProductsList = filterProductsBySearchValue(newFilterProductsList, searchValue);
        // Filter product list by type
        // If product type is not empty
        if (productType !== "")
            newFilterProductsList = filterProductsByType(newFilterProductsList, productType);

        setFilterProductsList(newFilterProductsList);
    }, [searchValue, productType, products]);
    return (
        <>
            {isLoadingProductList ? (
                <LoadingPage />
            ) : (
                <div className="flex w-full h-full flex-row items-start justify-between pb-[4.63rem] px-[4.81rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchProduct searchValue={searchValue} setSearchValue={setSearchValue} />
                        <ProductType
                            selectedProductType={productType}
                            setSelectedProductType={setProductType}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <ProductTable products={filterProductsList} />
                        {/** Only render Pagination when list product is larger than 11 */}
                        {totalPage > 1 && (
                            <Pagination
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
