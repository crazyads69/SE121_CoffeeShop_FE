import Loading from "./Loading";

export default function LoadingPage() {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-scroll bg-[#F2F3F3]">
            <div className="flex h-fit w-full flex-row items-center justify-between py-[1rem] px-[4.81rem]">
                <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                    THE COFFEESHOP
                </h1>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <Loading />
            </div>
        </div>
    );
}
