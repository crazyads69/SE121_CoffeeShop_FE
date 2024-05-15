"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import ProtectedRoute from "@/components/global/protected-route/protected-route";
import GetLocalStorage from "./get-local-storage";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <GetLocalStorage>
                <ProtectedRoute>{children}</ProtectedRoute>
            </GetLocalStorage>
        </Provider>
    );
}
