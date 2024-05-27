import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import NotFoundImg from "@/components/global/notfound/notfound-img";

export const metadata: Metadata = {
    title: "Not Found",
    description: "Not Found",
};

export default function NotFound() {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-scroll bg-[#F2F3F3]">
            <div className="flex h-fit w-full flex-row items-center justify-between py-[1rem] px-[4.81rem]">
                <Link href="/admin">
                    {/* <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                        THE COFFEESHOP
                    </h1> */}
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={250}
                        height={250}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-start px-[4.19rem] pt-[1.87rem]">
                <NotFoundImg />
            </div>
        </div>
    );
}
