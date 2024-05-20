"use client";

import AlertMessage from "@/components/global/alert/alert";

interface LoginLayoutProps {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-background-image bg-cover bg-center bg-no-repeat">
            <AlertMessage className="fixed top-[2%] right-[2%] mr-[1.25rem] mt-[1.25rem] h-[3.75rem] w-[26.5625rem]" />
            {children}
        </div>
    );
}
