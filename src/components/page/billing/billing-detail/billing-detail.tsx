/* eslint-disable jsx-a11y/control-has-associated-label */
import { Invoice } from "@/redux/slices/invoice-slice";
import { convertIsoStringToDate, formatCurrency } from "@/utils/custom-functions/custom-functions";

export interface BillingDetailProps {
    invoice: Invoice;
    setShowInvoiceDetail: (showInvoiceDetail: boolean) => void;
}

export default function BillingDetail({ invoice, setShowInvoiceDetail }: BillingDetailProps) {
    return (
        <div
            className="relative z-10 flex items-center justify-center overflow-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 backdrop-blur-lg" />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex h-full items-center justify-center">
                    <div
                        className="relative flex h-[32.1875rem]
w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pb-[1.67rem] pl-[2.19rem] pr-[6.06rem] pt-[2.06rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowInvoiceDetail(false);
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
                        {/* Header */}
                        <div className="grid grid-flow-col grid-cols-2 grid-rows-5 items-center justify-start gap-[0.75rem]">
                            <p className="font-sans text-[1rem] font-medium">Mã hoá đơn:</p>
                            <p className="col-start-2 font-sans text-[1rem] font-bold">
                                {invoice.id}
                            </p>
                            <p className="font-sans text-[1rem] font-medium">Thời gian:</p>
                            <div className="col-start-2 flex flex-row items-center justify-between border-b border-[#DFE4EA]">
                                <p className="font-sans text-[1rem] font-medium">
                                    {convertIsoStringToDate(invoice.created_at)}
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="ml-[0.53rem] h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                            </div>
                            <p className="font-sans text-[1rem] font-medium">Khách hàng:</p>
                            <div className="col-start-2 flex flex-row items-center justify-between border-b border-[#DFE4EA]">
                                <p className="font-sans text-[1rem] font-medium text-[#1C3FB7]">
                                    {invoice.customer === null
                                        ? "Khách vãng lai"
                                        : invoice.customer.name}
                                </p>
                            </div>
                            <p className="font-sans text-[1rem] font-medium">Bàn:</p>
                            <div className="col-start-2 flex flex-row items-center justify-between border-b border-[#DFE4EA]">
                                <p className="font-sans text-[1rem] font-medium text-[#1C3FB7]">
                                    {invoice.table_number === null || invoice.table_number === 0
                                        ? "Không cớ"
                                        : invoice.table_number}
                                </p>
                            </div>
                            <p className="font-sans text-[1rem] font-medium">Trạng thái:</p>
                            <div className="col-start-2 flex flex-row items-center justify-between border-b border-[#DFE4EA]">
                                <p className="font-sans text-[1rem] font-medium">
                                    {invoice.status === "pending" ? "Đang chờ" : "Đã hoàn thành"}
                                </p>
                            </div>
                        </div>
                        {/* Invoice Items Table */}
                        <div
                            className="mt-[0.75rem] h-[10.5rem] w-full overflow-x-auto overflow-y-scroll
rounded-[0.625rem] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.08)]"
                        >
                            <table className="w-full text-left rtl:text-right">
                                <thead className="h-[3.75rem] border-b border-[#EEE] bg-[#F9FAFB] font-sans text-[0.9375rem] font-normal text-[#111928]">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                        >
                                            MÃ HÀNG HOÁ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                        >
                                            TÊN HÀNG HOÁ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                        >
                                            SỐ LƯỢNG
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                        >
                                            GIÁ BÁN
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 font-sans text-[0.9375rem] font-medium text-[#111928]"
                                        >
                                            THÀNH TIỀN
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Product item */}
                                    {invoice.invoice_details.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="h-[2.3125rem] cursor-pointer border-b border-[#EEE] bg-white hover:bg-gray-200"
                                        >
                                            <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                {item.id}
                                            </td>
                                            <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                {item.product_name}
                                            </td>
                                            <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                {item.quantity}
                                            </td>
                                            <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                {formatCurrency(item.unit_price)}
                                            </td>
                                            <td className="select-none px-6 py-4 font-sans text-[0.875rem] font-medium">
                                                {formatCurrency(item.unit_price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Total */}
                        <div className="mt-[0.75rem] grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-start gap-[0.5rem] self-end">
                            <p className="font-sans text-[1rem] font-medium">Tổng số lượng:</p>
                            <p className="col-start-2 font-sans text-[1rem] font-bold">
                                {invoice.invoice_details.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0,
                                )}
                            </p>
                            <p className="font-sans text-[1rem] font-medium">Tổng tiền hàng:</p>
                            <p className="col-start-2 font-sans text-[1rem] font-bold">
                                {formatCurrency(invoice.total_price)}
                            </p>
                            <p className="font-sans text-[1rem] font-medium">Giảm giá:</p>
                            <p className="col-start-2 font-sans text-[1rem] font-bold">
                                {formatCurrency(invoice.discount_price)}
                            </p>
                            <p className="font-sans text-[1rem] font-medium">Khách đã trả:</p>
                            <p className="col-start-2 font-sans text-[1rem] font-bold">
                                {formatCurrency(invoice.final_price)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
