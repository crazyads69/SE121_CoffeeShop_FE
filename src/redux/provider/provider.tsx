"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
// import ProtectedAuth from "@/components/global/ProtectedAuth/ProtectedAuth";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            {/* <ProtectedAuth>{children}</ProtectedAuth> */}
            {children}
        </Provider>
    );
}
