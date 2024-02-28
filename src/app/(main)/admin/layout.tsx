/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
