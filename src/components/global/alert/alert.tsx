import { Alert } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/redux/store";
import { clearMessage } from "@/redux/slices/alert-slice";

interface AlertMessageProps {
    className: string;
}

// Error icon
export function ErrorIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ffffff"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
        </svg>
    );
}

export function SuccessIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

export default function AlertMessage({ className }: AlertMessageProps) {
    const message = useSelector((state: RootState) => state.alert.messages);
    const typeAlert = useSelector((state: RootState) => state.alert.type);
    // State for show alert
    const showMessage = useSelector((state: RootState) => state.alert.showMessage);
    const dispatch = useDispatch();
    // Timeout for alert message
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);
        return () => clearTimeout(timeout);
    }, [message, typeAlert]);
    return (
        <Alert
            open={showMessage}
            color={typeAlert === "success" ? "green" : "red"}
            icon={typeAlert === "success" ? <SuccessIcon /> : <ErrorIcon />}
            onClose={() => {
                dispatch(clearMessage());
            }}
            className={`${className} z-50`}
        >
            {message}
        </Alert>
    );
}
