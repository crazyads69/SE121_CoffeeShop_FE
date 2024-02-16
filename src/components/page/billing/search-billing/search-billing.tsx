/* eslint-disable jsx-a11y/label-has-associated-control */
export interface SearchBillingProps {
    searchBillID: string;
    setSearchBillID: (searchBillID: string) => void;
    searchCustomerID: string;
    setSearchCustomerID: (searchCustomerID: string) => void;
}

export default function SearchBilling({
    searchBillID,
    setSearchBillID,
    searchCustomerID,
    setSearchCustomerID,
}: SearchBillingProps) {
    const handleSearchBill = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBillID(e.target.value);
    };
    // TODO: Handle search customer by code and name
    const handleSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomerID(e.target.value);
    };
    return (
        <div className="flex h-[9.5rem] w-[13.625rem] flex-col rounded-[0.625rem] bg-white pb-[1.31rem] pl-[0.76rem] pr-[0.75rem] pt-[0.38rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <label className="select-none font-sans text-[1rem] font-bold" htmlFor="search">
                Tìm kiếm
            </label>
            <input
                type="text"
                id="search"
                value={searchBillID}
                onChange={handleSearchBill}
                placeholder="Theo mã hóa đơn"
                className="
                w-full
                border-b
                border-[#DFE4EA]
                py-[0.75rem]
                pl-[1.25rem]
                pr-[1rem]
                placeholder-[#9CA3AF]
                focus:outline-none
                focus:ring-0
                focus:ring-transparent
            "
            />
            <input
                type="text"
                id="search"
                value={searchCustomerID}
                onChange={handleSearchCustomer}
                placeholder="Theo mã khách hàng"
                className="
                w-full
                border-b
                border-[#DFE4EA]
                py-[0.75rem]
                pl-[1.25rem]
                pr-[1rem]
                placeholder-[#9CA3AF]
                focus:outline-none
                focus:ring-0
                focus:ring-transparent
            "
            />
        </div>
    );
}
