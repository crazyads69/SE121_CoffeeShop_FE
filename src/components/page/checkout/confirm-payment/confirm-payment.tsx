export interface ConfirmPaymentProps {
    showConfirmationPaymentModal: boolean;
    setShowConfirmationPaymentModal: (showConfirmationPaymentModal: boolean) => void;
    showDetailCheckoutModal: boolean;
    setShowDetailCheckoutModal: (showDetailCheckoutModal: boolean) => void;
}

export default function ConfirmPayment({
    showConfirmationPaymentModal,
    setShowConfirmationPaymentModal,
    showDetailCheckoutModal,
    setShowDetailCheckoutModal,
}: ConfirmPaymentProps) {
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
                    <div className="relative flex h-[20rem] w-[33.125rem] transform flex-col items-center justify-start overflow-hidden rounded-md bg-white p-[3.12rem] shadow-[0px_5px_12px_0px_rgba(0,0,0,0.10)] transition-all">
                        {/* Modal icon */}

                        {/* Modal title */}
                        <h1 className="mt-[1.38rem] text-center font-sans text-[1.5rem] font-bold text-[#111928]">
                            Xác nhận thanh toán
                        </h1>
                        {/* Modal description */}
                        <p className="mt-[0.94rem] text-center font-sans text-[#637381]">
                            Hệ thông sẽ tiến hành xác nhận thanh toán cho đơn hàng này. Bạn có chắc
                            chắn muốn tiếp tục?
                        </p>
                        <div className="mt-[2.19rem] flex w-full flex-row items-center justify-center space-x-[1.12rem]">
                            <button
                                type="button"
                                className="h-[3.125rem] w-[11.875rem] rounded-md border border-[#DFE4EA] bg-white px-[1.75rem] py-[0.81rem] font-sans font-medium"
                                onClick={() => {
                                    setShowConfirmationPaymentModal(false);
                                }}
                            >
                                Bỏ qua
                            </button>
                            <button
                                type="button"
                                className="h-[3.125rem] w-[11.875rem] rounded-md bg-[#12582E] px-[1.75rem] py-[0.81rem] font-sans font-medium text-white"
                                onClick={() => {
                                    setShowConfirmationPaymentModal(false);
                                    // Open detail payment modal
                                    setShowDetailCheckoutModal(true);
                                }}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
