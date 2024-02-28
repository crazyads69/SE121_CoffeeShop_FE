import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import PostLogout from "@/api/auth/post-logout";
import axiosClient from "@/utils/axios-client/axios-client";

export interface ProfileDropdownProps {
    setShowDropdown: (showDropdown: boolean) => void;
    setShowAccountModal: (showAccountModal: boolean) => void;
}

export default function ProfileDropdown({
    setShowDropdown,
    setShowAccountModal,
}: ProfileDropdownProps) {
    const clickOutsideRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const dispatch = useDispatch();
    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                clickOutsideRef.current &&
                !clickOutsideRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await PostLogout(router, dispatch);
    };

    return (
        <div
            ref={clickOutsideRef}
            className="absolute right-0 top-0 z-[200] mt-[3.1275rem] flex h-fit w-[11.125rem] flex-col items-center justify-start rounded-md border border-[#000000] bg-white shadow-[0px_1px_3px_0px_rgba(166,175,195,0.40)]"
        >
            <button
                type="button"
                className="flex w-full flex-row items-center justify-center px-[1rem] py-[0.44rem] hover:bg-gray-300"
                onClick={() => {
                    if (setShowAccountModal) setShowAccountModal(true);
                    setShowDropdown(false);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M14.5491 9.07502L13.5991 8.52502C13.6241 8.37502 13.6241 8.20002 13.6241 8.00002C13.6241 7.82502 13.6241 7.65002 13.5991 7.47502L14.5491 6.92502C15.1991 6.55002 15.4241 5.70002 15.0491 5.05002L14.0741 3.35002C13.8991 3.02502 13.5991 2.80002 13.2491 2.72502C12.8991 2.62502 12.5241 2.67502 12.1991 2.85002L11.2491 3.42502C10.9741 3.22502 10.6741 3.05002 10.3491 2.90002V1.80002C10.3491 1.05002 9.7241 0.425018 8.9741 0.425018H7.0241C6.2741 0.425018 5.6491 1.05002 5.6491 1.80002V2.90002C5.3241 3.05002 5.0241 3.22502 4.7491 3.40002L3.7991 2.85002C3.4741 2.67502 3.1241 2.62502 2.7491 2.72502C2.3991 2.82502 2.0991 3.05002 1.9241 3.35002L0.949102 5.05002C0.574102 5.70002 0.799102 6.55002 1.4491 6.92502L2.3991 7.47502C2.3741 7.62502 2.3741 7.80002 2.3741 8.00002C2.3741 8.17502 2.3741 8.35002 2.3991 8.52502L1.4491 9.07502C0.799102 9.45002 0.574102 10.3 0.949102 10.95L1.9241 12.65C2.0991 12.975 2.3991 13.2 2.7491 13.275C3.0991 13.375 3.4741 13.325 3.7991 13.15L4.7491 12.6C5.0241 12.8 5.3241 12.975 5.6491 13.1V14.2C5.6491 14.95 6.2741 15.575 7.0241 15.575H8.9741C9.7241 15.575 10.3491 14.95 10.3491 14.2V13.1C10.6741 12.95 10.9741 12.775 11.2491 12.575L12.1991 13.125C12.5241 13.3 12.8741 13.35 13.2241 13.25C13.5741 13.15 13.8741 12.925 14.0491 12.625L15.0241 10.925C15.3991 10.275 15.1741 9.45002 14.5491 9.07502ZM14.0741 10.375L13.0991 12.075C13.0741 12.125 13.0241 12.175 12.9491 12.175C12.8741 12.2 12.8241 12.175 12.7741 12.15L11.7741 11.575C11.3991 11.35 10.9491 11.375 10.5991 11.625C10.3741 11.8 10.1241 11.925 9.8491 12.05C9.4741 12.225 9.2241 12.6 9.2241 13.025V14.175C9.2241 14.3 9.1241 14.425 8.9741 14.425H7.0241C6.8991 14.425 6.7741 14.325 6.7741 14.175V13.025C6.7741 12.6 6.5241 12.225 6.1491 12.05C5.8741 11.925 5.6241 11.775 5.3991 11.625C5.2241 11.5 4.9991 11.425 4.7741 11.425C4.5741 11.425 4.3991 11.475 4.2491 11.575L3.2491 12.15C3.1991 12.175 3.1241 12.2 3.0741 12.175C3.0241 12.15 2.9741 12.125 2.9241 12.075L1.9491 10.375C1.8741 10.25 1.9241 10.1 2.0241 10.05L3.0241 9.47502C3.3741 9.27502 3.5991 8.85002 3.5491 8.45002C3.5241 8.32502 3.5241 8.17502 3.5241 8.02502C3.5241 7.85002 3.5241 7.72502 3.5491 7.60002C3.5991 7.17502 3.3991 6.77502 3.0241 6.57502L2.0241 6.00002C1.8991 5.92502 1.8741 5.77502 1.9241 5.67502L2.8991 3.97502C2.9241 3.92502 2.9741 3.87502 3.0491 3.87502C3.1241 3.85002 3.1741 3.87502 3.2241 3.90002L4.2241 4.47502C4.5991 4.70002 5.0491 4.67502 5.3991 4.42502C5.6241 4.25002 5.8741 4.12502 6.1491 4.00002C6.5241 3.82502 6.7741 3.45002 6.7741 3.02502V1.80002C6.7741 1.67502 6.8741 1.55002 7.0241 1.55002H8.9741C9.0991 1.55002 9.2241 1.65002 9.2241 1.80002V2.95002C9.2241 3.37502 9.4741 3.75002 9.8491 3.92502C10.1241 4.05002 10.3741 4.20002 10.5991 4.35002C10.9491 4.60002 11.3991 4.62502 11.7491 4.42502L12.7491 3.85002C12.7991 3.82502 12.8741 3.80002 12.9241 3.82502C12.9741 3.85002 13.0241 3.87502 13.0741 3.92502L14.0491 5.62502C14.1241 5.75002 14.0741 5.90002 13.9741 5.95002L12.9741 6.52502C12.6241 6.72502 12.3991 7.15002 12.4491 7.55002C12.4741 7.67502 12.4741 7.82502 12.4741 7.97502C12.4741 8.15002 12.4741 8.27502 12.4491 8.40002C12.3991 8.82502 12.6241 9.22502 12.9741 9.42502L13.9741 10C14.0991 10.1 14.1241 10.25 14.0741 10.375Z"
                        fill="black"
                    />
                    <path
                        d="M7.99941 4.77502C6.22441 4.77502 4.77441 6.22502 4.77441 8.00002C4.77441 9.77502 6.22441 11.225 7.99941 11.225C9.77441 11.225 11.2244 9.77502 11.2244 8.00002C11.2244 6.22502 9.77441 4.77502 7.99941 4.77502ZM7.99941 10.1C6.84941 10.1 5.89941 9.15002 5.89941 8.00002C5.89941 6.85002 6.84941 5.90002 7.99941 5.90002C9.14941 5.90002 10.0994 6.85002 10.0994 8.00002C10.0994 9.15002 9.14941 10.1 7.99941 10.1Z"
                        fill="black"
                    />
                    <path
                        d="M8.42422 8.05002V7.35002C8.42422 7.05002 8.17422 6.80002 7.87422 6.80002C7.57422 6.80002 7.32422 7.05002 7.32422 7.35002V8.30002C7.32422 8.45002 7.37422 8.60002 7.49922 8.70002L8.04922 9.25002C8.14922 9.35002 8.29922 9.42502 8.44922 9.42502C8.59922 9.42502 8.74922 9.37502 8.84922 9.25002C9.07422 9.02502 9.07422 8.67502 8.84922 8.45002L8.42422 8.05002Z"
                        fill="black"
                    />
                </svg>
                <p className="ml-[0.63rem] select-none font-sans text-[1rem]">Tài khoản</p>
            </button>
            <button
                type="button"
                className="mt-[0.31rem] flex w-full flex-row items-center justify-center px-[1rem] py-[0.44rem] hover:bg-gray-300"
                onClick={handleLogout}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                >
                    <path
                        d="M6.47441 0.783315H9.29941C10.3178 0.783315 11.1661 1.61154 11.1661 2.64998V13.35C11.1661 14.3684 10.3379 15.2166 9.29941 15.2166H6.47441C6.00851 15.2166 5.60775 14.8159 5.60775 14.35V12.625C5.60775 12.499 5.69341 12.4083 5.82441 12.4083C5.97506 12.4083 6.06608 12.5187 6.06608 12.625V14.35C6.06608 14.4264 6.0854 14.5449 6.18246 14.6419C6.27952 14.739 6.39803 14.7583 6.47441 14.7583H9.29941C10.0835 14.7583 10.7077 14.1341 10.7077 13.35V2.62498C10.7077 1.84089 10.0835 1.21665 9.29941 1.21665H6.47441C6.39803 1.21665 6.27952 1.23597 6.18246 1.33303C6.0854 1.43009 6.06608 1.5486 6.06608 1.62498V3.37498C6.06608 3.47214 5.95964 3.59165 5.82441 3.59165C5.70851 3.59165 5.60775 3.49089 5.60775 3.37498V1.64998C5.60775 1.18408 6.00851 0.783315 6.47441 0.783315Z"
                        fill="black"
                        stroke="black"
                        strokeWidth="0.666667"
                    />
                    <path
                        d="M2.39961 8.55H6.87461C7.17461 8.55 7.42461 8.3 7.42461 8C7.42461 7.7 7.17461 7.45 6.87461 7.45H2.42461L3.97461 5.875C4.19961 5.65 4.19961 5.3 3.97461 5.075C3.74961 4.85 3.39961 4.85 3.17461 5.075L0.674609 7.625C0.449609 7.85 0.449609 8.2 0.674609 8.425L3.17461 10.975C3.27461 11.075 3.42461 11.15 3.57461 11.15C3.72461 11.15 3.84961 11.1 3.97461 11C4.19961 10.775 4.19961 10.425 3.97461 10.2L2.39961 8.55Z"
                        fill="black"
                    />
                </svg>
                <p className="ml-[0.63rem] select-none font-sans text-[1rem]">Đăng xuất</p>
            </button>
        </div>
    );
}
