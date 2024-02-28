/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hoá đơn",
    description: "Hoá đơn",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
