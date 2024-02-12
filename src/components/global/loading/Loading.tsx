import { SyncLoader } from "react-spinners";

const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#3758F9",
};

export default function Loading() {
    return (
        <div className="flex h-screen w-full flex-row items-center justify-center overflow-hidden">
            <SyncLoader color="#3758F9" loading cssOverride={override} size={15} />
        </div>
    );
}
