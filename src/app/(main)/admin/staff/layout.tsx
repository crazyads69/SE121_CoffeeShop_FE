/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nhân viên",
    description: "Nhân viên",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
