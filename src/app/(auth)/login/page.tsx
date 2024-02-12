"use client";

import LoginForm from "@/components/page/auth/login-form/login-form";
import LoginLayout from "./layout";

export default function Page() {
    return (
        <LoginLayout>
            <LoginForm />
        </LoginLayout>
    );
}
