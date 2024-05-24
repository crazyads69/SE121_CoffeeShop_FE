/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./profile-dropdown";
import { RootState } from "@/redux/store";
import { loginSuccess } from "@/redux/slices/auth-slice";

interface ProfileButtonProps {
    setShowAccountModal: (showAccountModal: boolean) => void;
    setShowBankConfig: (showBankConfig: boolean) => void;
}

export default function ProfileButton({
    setShowAccountModal,
    setShowBankConfig,
}: ProfileButtonProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    // const user_data = localStorage.getItem("user");
    const dispatch = useDispatch();
    // Check if user_data exists in local storage and dispatch loginSuccess action to update user state again
    // useEffect(() => {
    //     if (user_data) {
    //         dispatch(loginSuccess(JSON.parse(user_data)));
    //     }
    // }, []);

    // Add ref to handle click outside
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const handleClicked = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="relative z-[300]">
            <div
                className="relative z-[300] flex h-[2.6875rem] w-[11.125rem] cursor-pointer flex-row items-center justify-between rounded-md border-[1px] border-black px-[1rem] py-[0.75rem] hover:bg-gray-300"
                onClick={handleClicked}
            >
                <h1 className="select-none font-sans text-[1rem] font-bold">{user?.name}</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </div>
            {showDropdown && (
                <ProfileDropdown
                    setShowDropdown={setShowDropdown}
                    setShowAccountModal={setShowAccountModal}
                    setShowBankConfig={setShowBankConfig}
                />
            )}
        </div>
    );
}
