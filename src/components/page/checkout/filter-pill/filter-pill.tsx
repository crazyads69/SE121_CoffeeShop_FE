/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
export interface FilterPillProps {
    selectedProductType: string;
    setSelectedProductType: (selectedProductType: string) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
}

export default function FilterPill({
    selectedProductType,
    setSelectedProductType,
    searchValue,
    setSearchValue,
}: FilterPillProps) {
    return (
        <div className="flex w-full flex-row items-center justify-start ">
            <div
                className={`flex h-[2.25rem] w-[5.625rem] cursor-pointer select-none items-center justify-center rounded-full ${
                    selectedProductType === "" ? "bg-[#435A72]" : ""
                }`}
                onClick={() => {
                    setSelectedProductType("");
                }}
            >
                <p
                    className={`font-sans text-[1rem] text-black ${
                        selectedProductType === "" ? "text-white" : "text-black"
                    }`}
                >
                    Tất cả
                </p>
            </div>
            <div
                className={`flex h-[2.25rem] w-[6.45919rem] cursor-pointer select-none items-center justify-center rounded-full ${
                    selectedProductType === "Đồ ăn" ? "bg-[#435A72]" : ""
                }`}
                onClick={() => {
                    setSelectedProductType("Đồ ăn");
                }}
            >
                <p
                    className={`font-sans text-[1rem] text-black ${
                        selectedProductType === "Đồ ăn" ? "text-white" : "text-black"
                    }`}
                >
                    Đồ ăn
                </p>
            </div>
            <div
                className={`flex h-[2.25rem] w-[6.45919rem] cursor-pointer select-none items-center justify-center rounded-full ${
                    selectedProductType === "Đồ uống" ? "bg-[#435A72]" : ""
                }`}
                onClick={() => {
                    setSelectedProductType("Đồ uống");
                }}
            >
                <p
                    className={`font-sans text-[1rem] text-black ${
                        selectedProductType === "Đồ uống" ? "text-white" : "text-black"
                    }`}
                >
                    Đồ uống
                </p>
            </div>
            <div
                className={`flex h-[2.25rem] w-[6.45919rem] cursor-pointer select-none items-center justify-center rounded-full ${
                    selectedProductType === "Khác" ? "bg-[#435A72]" : ""
                }`}
                onClick={() => {
                    setSelectedProductType("Khác");
                }}
            >
                <p
                    className={`font-sans text-[1rem] text-black ${
                        selectedProductType === "Khác" ? "text-white" : "text-black"
                    }`}
                >
                    Khác
                </p>
            </div>
            {/** Input search bar  */}
            <div className="relative">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    placeholder="Tìm món"
                    className="ml-[1rem] h-[2.25rem] w-[10.125rem] border-b border-black font-sans text-[1rem] text-black placeholder:select-none focus:outline-none focus:ring-0"
                />
                <div className="absolute right-0 top-0 flex h-full w-[2.25rem] items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                    >
                        <path
                            d="M21.8719 18.0532L18.0094 14.1907C17.4844 13.6657 16.7719 13.3657 16.0219 13.3657C15.5719 13.3657 15.1219 13.4782 14.7469 13.6657L12.7969 11.7157C15.0094 8.9032 14.8219 4.8157 12.2344 2.1907C9.45938 -0.546804 4.88438 -0.546804 2.10938 2.2657C-0.703125 5.0782 -0.703125 9.61569 2.10938 12.4282C3.49688 13.7782 5.33437 14.4907 7.17188 14.4907C8.74687 14.4907 10.3219 13.9657 11.5969 12.9532L13.5469 14.9032C13.3594 15.2782 13.2469 15.7282 13.2469 16.1782C13.2469 16.9282 13.5469 17.6407 14.0719 18.1657L17.9344 22.0282C18.4969 22.5907 19.2094 22.8532 19.9219 22.8532C20.6344 22.8532 21.3469 22.5907 21.9094 22.0282C22.9594 20.9407 22.9594 19.1407 21.8719 18.0532ZM3.27188 11.1907C1.13438 9.0532 1.13438 5.5657 3.27188 3.4282C4.35938 2.3407 5.74687 1.8157 7.13437 1.8157C8.52187 1.8157 9.94688 2.3407 11.0344 3.4282C13.1719 5.5657 13.1719 9.0532 11.0344 11.1907C8.89688 13.3282 5.40938 13.3282 3.27188 11.1907ZM20.6719 20.8282C20.2594 21.2407 19.5469 21.2782 19.0969 20.8282L15.2344 16.9657C15.0094 16.7407 14.8969 16.4782 14.8969 16.1782C14.8969 15.8782 15.0094 15.6157 15.2344 15.3907C15.4594 15.1657 15.7219 15.0532 16.0219 15.0532C16.3219 15.0532 16.5844 15.1657 16.8094 15.3907L20.6719 19.2532C21.0844 19.7032 21.0844 20.3782 20.6719 20.8282Z"
                            fill="black"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
