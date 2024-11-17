import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { loginSuccess } from "../slices/auth-slice";
import { fetchChatSuccess } from "../slices/chat-slice";

export default function GetLocalStorage({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const user_data = localStorage.getItem("user");
        if (user_data) {
            dispatch(loginSuccess(JSON.parse(user_data)));
        }
        const chat_đata = localStorage.getItem("chat");
        if (chat_đata) {
            dispatch(fetchChatSuccess(JSON.parse(chat_đata)));
        } else {
            dispatch(
                fetchChatSuccess([
                    {
                        id: uuid(), // Generate random ID
                        message: "Xin chào, tôi có thể giúp gì cho bạn?",
                        is_bot: true,
                    },
                ]),
            );
        }
    }, []);
    return children;
}
