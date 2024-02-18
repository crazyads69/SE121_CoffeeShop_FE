import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DeleteStaffs from "@/api/staff/delete-staffs";

export interface DeleteStaffListProps {
    showDeleteStaffModal: boolean;
    setShowDeleteStaffModal: (showDeleteStaffModal: boolean) => void;
}

export default function DeleteStaffList({
    showDeleteStaffModal,
    setShowDeleteStaffModal,
}: DeleteStaffListProps) {
    const selectedStaffList = useSelector((state: RootState) => state.staff.selectedStaff);
    const dispatch = useDispatch();
    const handleDeleteStaffList = async () => {
        await DeleteStaffs(selectedStaffList, setShowDeleteStaffModal, dispatch);
    };
    return (
        <div
            className="relative z-10 flex items-center justify-center overflow-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 backdrop-blur-lg" />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="relative flex h-full items-center justify-center">
                    <div className="relative flex h-[24rem] w-[33.125rem] transform flex-col items-center justify-start overflow-hidden rounded-md bg-white p-[3.12rem] shadow-[0px_5px_12px_0px_rgba(0,0,0,0.10)] transition-all">
                        {/* Modal icon */}
                        <div className="inline-flex items-center justify-center rounded-full bg-[#FEEBEB] px-[1.13rem] py-[1.12rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="20"
                                viewBox="0 0 24 20"
                                fill="none"
                            >
                                <path
                                    d="M22.6875 14.4875L14.6625 1.57498C14.025 0.712475 13.05 0.224976 12 0.224976C10.9125 0.224976 9.93753 0.712475 9.33753 1.57498L1.31253 14.4875C0.562527 15.5 0.450027 16.8125 1.01253 17.9375C1.57503 19.0625 2.70003 19.775 3.97503 19.775H20.025C21.3 19.775 22.425 19.0625 22.9875 17.9375C23.55 16.85 23.4375 15.5 22.6875 14.4875ZM21.4875 17.1875C21.1875 17.75 20.6625 18.0875 20.025 18.0875H3.97503C3.33753 18.0875 2.81253 17.75 2.51253 17.1875C2.25003 16.625 2.28753 15.9875 2.66253 15.5L10.6875 2.58748C10.9875 2.17498 11.475 1.91248 12 1.91248C12.525 1.91248 13.0125 2.13748 13.3125 2.58748L21.3375 15.5C21.7125 15.9875 21.75 16.625 21.4875 17.1875Z"
                                    fill="#E10E0E"
                                />
                                <path
                                    d="M12.0002 7.19995C11.5502 7.19995 11.1377 7.57495 11.1377 8.06245V12.15C11.1377 12.6 11.5127 13.0125 12.0002 13.0125C12.4877 13.0125 12.8627 12.6375 12.8627 12.15V8.02495C12.8627 7.57495 12.4502 7.19995 12.0002 7.19995Z"
                                    fill="#E10E0E"
                                />
                                <path
                                    d="M12.0002 14C11.5502 14 11.1377 14.375 11.1377 14.8625V15.05C11.1377 15.5 11.5127 15.9125 12.0002 15.9125C12.4877 15.9125 12.8627 15.5375 12.8627 15.05V14.825C12.8627 14.375 12.4502 14 12.0002 14Z"
                                    fill="#E10E0E"
                                />
                            </svg>
                        </div>
                        {/* Modal title */}
                        <h1 className="mt-[1.38rem] text-center font-sans text-[1.5rem] font-bold text-[#111928]">
                            Xoá hàng hoá
                        </h1>
                        {/* Modal description */}
                        <p className="mt-[0.94rem] text-center font-sans text-[#637381]">
                            Hệ thông sẽ xoá bỏ
                            <span className="font-sans font-bold text-[#637381]">
                                {" "}
                                toàn bộ nhân viên đã chọn
                            </span>
                            . Bạn có chắc chắn muốn xoá ?
                        </p>
                        <div className="mt-[2.19rem] flex w-full flex-row items-center justify-center space-x-[1.12rem]">
                            <button
                                type="button"
                                className="h-[3.125rem] w-[11.875rem] rounded-md border border-[#DFE4EA] bg-white px-[1.75rem] py-[0.81rem] font-sans font-medium"
                                onClick={() => {
                                    setShowDeleteStaffModal(false);
                                }}
                            >
                                Bỏ qua
                            </button>
                            <button
                                type="button"
                                className="h-[3.125rem] w-[11.875rem] rounded-md bg-[#E10E0E] px-[1.75rem] py-[0.81rem] font-sans font-medium text-white"
                                onClick={handleDeleteStaffList}
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
