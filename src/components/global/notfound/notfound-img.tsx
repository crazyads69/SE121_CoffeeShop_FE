"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { USER_ROLE } from "@/utils/constant/constant";
import { RootState } from "@/redux/store";

export default function NotFoundImg() {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-[20rem] h-[20rem]">
                <Image
                    src="/images/not_found.png"
                    alt="Not Found"
                    layout="fill"
                    className="aspect-square"
                />
            </div>
            <h1 className="mt-[2rem] font-sans text-[1.5rem] font-bold">
                404 - Không tìm thấy trang
            </h1>
            <p className="mt-[1rem] font-sans text-[1rem] font-medium">
                Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
            </p>
            <button
                className="mt-[1rem] rounded bg-[#3758F9] px-[1.5rem] py-[0.5rem] font-sans text-[1rem] font-bold text-white hover:bg-[#1C3FB7]"
                type="button"
                onClick={() => {
                    // Check route to reddirect back
                    if (user?.role === USER_ROLE.ADMIN) {
                        router.push("/admin");
                    } else {
                        router.push("/billing");
                    }
                }}
            >
                Quay lại trang chủ
            </button>
        </div>
    );
}
