/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setError } from "@/redux/slices/alert-slice";
import { RootState } from "@/redux/store";
import PostLogin from "@/api/auth/post-login";

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const showMessage = useSelector((state: RootState) => state.alert.showMessage);
    const hasError = useSelector((state: RootState) => state.alert.type);
    // State for each input
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Update value for each input
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // If not input enough field, show error
        if (email.length === 0 || password.length === 0) {
            dispatch(setError("Vui lòng nhập đầy đủ thông tin!"));
            return;
        }
        // Post Login API
        PostLogin(email, password, router, dispatch);
    };
    return (
        <div className="flex h-[24.125rem] w-[26.5625rem] flex-col items-center justify-start rounded-[0.625rem] bg-white px-[2.37rem] py-[2rem]">
            {/* <h1 className="select-none text-center font-sans text-[1.5rem] font-bold">
                THE COFFEESHOP
            </h1> */}
            <Image
                src="/images/logo.svg"
                alt="logo"
                width={250}
                height={250}
                className="flex items-center justify-center"
            />
            <form onSubmit={handleSubmit}>
                <div className="mt-[0.81rem] flex flex-col items-start justify-start">
                    <label
                        htmlFor="email"
                        className="select-none font-sans text-[1rem] font-medium text-[#212B36]"
                    >
                        Tên đăng nhập
                    </label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="email"
                            onChange={handleChangeEmail}
                            value={email}
                            maxLength={255}
                            className={`mt-[0.63rem] h-[2.875rem] w-[21.875rem] rounded-md border-[1px] ${
                                hasError ? "border-red-500" : "border-[#DFE4EA]"
                            } py-[0.75rem] px-[1.25rem]`}
                        />
                        {hasError === "error" && showMessage === true && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#ef4444"
                                className="absolute right-0 top-5 mr-[1rem] h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="mt-[0.81rem] flex flex-col items-start justify-start">
                    <label
                        htmlFor="password"
                        className="select-none font-sans text-[1rem] font-medium text-[#212B36]"
                    >
                        Mật khẩu
                    </label>
                    <div className="relative w-full">
                        <input
                            type="password"
                            id="password"
                            maxLength={50}
                            value={password}
                            onChange={handleChangePassword}
                            className={`mt-[0.63rem] h-[2.875rem] w-[21.875rem] rounded-md border-[1px] ${
                                hasError ? "border-red-500" : "border-[#DFE4EA]"
                            } py-[0.75rem] px-[1.25rem]`}
                        />
                        {hasError === "error" && showMessage === true && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#ef4444"
                                className="absolute right-0 top-5 mr-[1rem] h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                            </svg>
                        )}
                    </div>
                </div>
                {/* <div className="mt-[0.44rem] flex items-center justify-end">
                    <a href="/" className="font-sans text-[1rem] text-[#3758F9]">
                        Quên mật khẩu?
                    </a>
                </div> */}
                <div className="mt-[1.62rem] flex items-center justify-center">
                    <button
                        type="submit"
                        className="h-[3rem] w-[8.6875rem] rounded-md bg-[#3758F9] hover:bg-[#1C3FB7] font-sans text-[1rem] font-medium text-white"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}
