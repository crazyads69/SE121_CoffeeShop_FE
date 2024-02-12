"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import ProtectedRoute from "@/components/global/protected-route/protected-route";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <ProtectedRoute>{children}</ProtectedRoute>
        </Provider>
    );
}
