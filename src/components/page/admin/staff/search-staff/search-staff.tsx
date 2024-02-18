export interface SearchStaffProps {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
}

export default function SearchStaff({ searchValue, setSearchValue }: SearchStaffProps) {
    return (
        <div className="ml-[1rem] flex h-[2.6875rem] w-[20.625rem] flex-row items-center justify-between rounded-md bg-white px-[0.88rem] py-[0.25rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <input
                type="text"
                maxLength={255}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Theo mã, tên nhân viên"
                className="h-[2.1875rem] w-[11.875rem] border-b border-[#DFE4EA] px-[1rem] py-[0.75rem] placeholder:text-[0.9315rem]
placeholder:text-[#9CA3AF] focus:outline-none focus:ring-0"
            />
            <p className="font-sans text-[1rem] font-bold">Tìm kiếm</p>
        </div>
    );
}
