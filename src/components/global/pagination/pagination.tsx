import ReactPaginate from "react-paginate";

export interface PaginationProps {
    totalPage: number;
    activePage: number;
    setActivePage: (activePage: number) => void;
}

export default function Pagination({ totalPage, activePage, setActivePage }: PaginationProps) {
    const handlePageClick = (data: { selected: number }) => {
        setActivePage(data.selected + 1);
    };
    return (
        <div className="mt-[0.75rem] h-[3.625rem] w-fit">
            <ReactPaginate
                previousLabel={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="16"
                        viewBox="0 0 8 16"
                        fill="none"
                    >
                        <path
                            d="M7.17822 15.1156C7.00947 15.1156 6.84072 15.0594 6.72822 14.9187L0.371973 8.45C0.118848 8.19687 0.118848 7.80312 0.371973 7.55L6.72822 1.08125C6.98135 0.828122 7.3751 0.828122 7.62822 1.08125C7.88135 1.33437 7.88135 1.72812 7.62822 1.98125L1.72197 8L7.65635 14.0187C7.90947 14.2719 7.90947 14.6656 7.65635 14.9187C7.4876 15.0312 7.34697 15.1156 7.17822 15.1156Z"
                            fill="#637381"
                        />
                    </svg>
                }
                nextLabel={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="16"
                        viewBox="0 0 8 16"
                        fill="none"
                    >
                        <path
                            d="M0.821973 15.1156C0.653223 15.1156 0.512598 15.0594 0.371973 14.9469C0.118848 14.6937 0.118848 14.3 0.371973 14.0469L6.27822 8L0.371973 1.98125C0.118848 1.72812 0.118848 1.33437 0.371973 1.08125C0.625098 0.828122 1.01885 0.828122 1.27197 1.08125L7.62822 7.55C7.88135 7.80312 7.88135 8.19687 7.62822 8.45L1.27197 14.9187C1.15947 15.0312 0.990723 15.1156 0.821973 15.1156Z"
                            fill="#637381"
                        />
                    </svg>
                }
                breakLabel="..."
                pageCount={totalPage}
                initialPage={0}
                forcePage={activePage - 1}
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                containerClassName="flex flex-row items-center justify-center bg-white border border-[#DFE4EA] rounded-[0.625rem] px-[0.75rem] py-[0.75rem] gap-x-[0.5rem] gap-y-[0.5rem]"
                pageClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                breakClassName=" select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col  items-center justify-center border-[#DFE4EA]"
                previousClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                nextClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                activeClassName="select-none w-[2.125rem] h-[2.125rem] py-[0.5rem] rounded-md font-sans text-[#FFFFFF] bg-[#3758F9] flex-col flex items-center justify-center"
            />
        </div>
    );
}
