/* eslint-disable jsx-a11y/label-has-associated-control */
export interface SearchLoyalProps {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
}

export default function SearchLoyal({ searchValue, setSearchValue }: SearchLoyalProps) {
    return (
        <div className=" flex h-[5.5rem] w-[12.875rem] flex-col rounded-[0.625rem] bg-white pb-[1.31rem] pl-[0.7rem] pr-[1.6rem] pt-[0.38rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <label className="font-sans text-[1rem] font-bold" htmlFor="search">
                Tìm kiếm
            </label>
            <input
                type="text"
                id="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Theo mức thành viên"
                className="
                w-full
                border-b
                border-[#DFE4EA]
                pl-[1.25rem]
                pr-[1rem]
                pt-[0.75rem]
                placeholder-[#9CA3AF]
                focus:outline-none
                focus:ring-0
                focus:ring-transparent
            "
            />
        </div>
    );
}
