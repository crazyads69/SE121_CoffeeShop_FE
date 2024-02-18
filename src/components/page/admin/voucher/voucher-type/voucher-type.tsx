/* eslint-disable jsx-a11y/label-has-associated-control */
interface VoucherTypeProps {
    selectedVoucherType: string;
    setSelectedVoucherType: (selectedVoucherType: string) => void;
}

export default function VoucherType({
    selectedVoucherType,
    setSelectedVoucherType,
}: VoucherTypeProps) {
    // Handle search product by type in checkbox

    return (
        <div className="mt-[1.25rem] flex h-[7.4375rem] w-[12.875rem] flex-col rounded-[0.625rem] bg-white pb-[1.44rem] pl-[0.87rem] pt-[0.5rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <label className="mb-[0.87rem] font-sans text-[1rem] font-bold" htmlFor="search">
                Loại voucher
            </label>
            {/* Đô ăn */}
            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center rounded-full"
                    htmlFor="direct-type"
                    data-ripple-dark="true"
                >
                    <input
                        id="direct-type"
                        type="checkbox"
                        checked={selectedVoucherType === "direct"}
                        onChange={() => {
                            if (selectedVoucherType === "direct") {
                                setSelectedVoucherType("");
                            } else {
                                setSelectedVoucherType("direct");
                            }
                        }}
                        onClick={() => {
                            if (selectedVoucherType === "direct") {
                                setSelectedVoucherType("");
                            } else {
                                setSelectedVoucherType("direct");
                            }
                        }}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3758F9] checked:bg-[#3758F9] checked:before:bg-[#3758F9] hover:before:opacity-10"
                    />
                    <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </label>
                <label
                    className="ml-[0.62rem] cursor-pointer select-none font-sans text-[1rem]"
                    htmlFor="direct-type"
                >
                    Trực tiếp
                </label>
            </div>
            {/* Đồ uống */}
            <div className="mt-[0.25rem] inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center rounded-full"
                    htmlFor="percent-type"
                    data-ripple-dark="true"
                >
                    <input
                        id="percent-type"
                        type="checkbox"
                        checked={selectedVoucherType === "percent"}
                        onChange={() => {
                            if (selectedVoucherType === "percent") {
                                setSelectedVoucherType("");
                            } else {
                                setSelectedVoucherType("percent");
                            }
                        }}
                        onClick={() => {
                            if (selectedVoucherType === "percent") {
                                setSelectedVoucherType("");
                            } else {
                                setSelectedVoucherType("percent");
                            }
                        }}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3758F9] checked:bg-[#3758F9] checked:before:bg-[#3758F9] hover:before:opacity-10"
                    />
                    <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </label>
                <label
                    className="ml-[0.62rem] cursor-pointer select-none font-sans text-[1rem]"
                    htmlFor="percent-type"
                >
                    Phần trăm
                </label>
            </div>
        </div>
    );
}
