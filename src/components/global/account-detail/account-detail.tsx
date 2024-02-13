/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { convertIsoStringToDate } from "@/utils/custom-functions/custom-functions";
import { USER_ROLE } from "@/utils/constant/constant";

export interface AccountDetailProps {
    setShowAccountModal: (showAccountModal: boolean) => void;
}

export default function AccountDetail({ setShowAccountModal }: AccountDetailProps) {
    const user = useSelector((state: RootState) => state.auth.user);
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
                        className="relative flex h-[22.4375rem]
w-[54.0625rem] transform flex-col items-start justify-start overflow-hidden rounded-md bg-white pl-[3rem] py-[1.94rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all"
                    >
                        {/* close button */}
                        <button
                            type="button"
                            className="absolute right-5 top-5"
                            onClick={() => {
                                setShowAccountModal(false);
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
                        <h1 className="text-left font-sans text-[1.5rem] font-bold text-[#1C3FB7]">
                            THÔNG TIN TÀI KHOẢN
                        </h1>
                        {/* Product info */}
                        <div className="mt-[1.56rem] flex w-full flex-row items-start justify-start">
                            <div className="ml-[2rem] flex flex-col items-start justify-start">
                                {/* Product name and price */}
                                <div className="grid grid-flow-col grid-cols-2 items-center justify-start gap-[1rem]">
                                    <h1 className="font-sans text-[1rem]">Mã tài khoản:</h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {user?.id}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Tên tài khoản:</h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {user?.name}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Email: </h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {user?.email}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Vai trò: </h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {user?.role === USER_ROLE.ADMIN
                                            ? "Quản trị viên"
                                            : "Nhân viên"}
                                    </p>
                                    <h1 className="font-sans text-[1rem]">Ngày tham gia: </h1>
                                    <p className="col-start-2 font-sans text-[1rem] font-bold">
                                        {convertIsoStringToDate(user?.created_at as string)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
