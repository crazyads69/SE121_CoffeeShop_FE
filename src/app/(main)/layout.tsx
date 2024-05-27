"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import NavBar from "@/components/global/navbar/navbar";
import AccountDetail from "@/components/global/account-detail/account-detail";
import AlertMessage from "../../components/global/alert/alert";
import ProfileButton from "@/components/global/profile-button/profile-button";
import { USER_ROLE } from "@/utils/constant/constant";
import BankConfig from "@/components/global/bank-config/bank-config";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
    const [showBankConfig, setShowBankConfig] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="min-w-screen relative flex min-h-screen flex-col items-center justify-start bg-[#F2F3F3]">
            {/* Header */}
            <div className="sticky z-[300] flex h-fit w-full flex-row items-center justify-between py-[1rem] px-[4.81rem]">
                <Link href={user?.role === USER_ROLE.ADMIN ? "/admin" : "/checkout"}>
                    {/* <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                        THE COFFEESHOP
                    </h1> */}
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={150}
                        height={150}
                        className="cursor-pointer"
                    />
                </Link>
                <ProfileButton
                    setShowAccountModal={setShowAccountModal}
                    setShowBankConfig={setShowBankConfig}
                />
            </div>
            {/* Navbar */}
            <NavBar />
            <AlertMessage className="fixed top-[2%] right-[2%] mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[28.5625rem]" />
            {showAccountModal && <AccountDetail setShowAccountModal={setShowAccountModal} />}
            {showBankConfig && <BankConfig setShowBankConfig={setShowBankConfig} />}
            {/** Content */}
            {children}
        </div>
    );
}
