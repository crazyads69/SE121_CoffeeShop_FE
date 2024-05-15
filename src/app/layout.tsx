import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider/provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: {
        template: "%s | Coffee Shop",
        default: "Coffee Shop",
    },
    description: "Coffee Shop App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
