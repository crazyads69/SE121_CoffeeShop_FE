/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khách hàng",
    description: "Khách hàng",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
