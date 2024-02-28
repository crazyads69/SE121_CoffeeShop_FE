/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bán hàng",
    description: "Bán hàng",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
