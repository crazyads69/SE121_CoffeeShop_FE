import { AnyAction, Dispatch } from "redux";
import { v4 as uuid } from "uuid";
import { Chat, addChatSuccess, fetchChatLoading, stopLoading } from "@/redux/slices/chat-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export default async function PostChatBot(
    message: string,
    dispatch: Dispatch<AnyAction>,
    chatList: Chat[],
) {
    try {
        // Perform loading when call API
        dispatch(fetchChatLoading());
        const res = await axiosClient.post("/chat", {
            message,
        });
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            // Process response data (remove HTML tags and line breaks)
            const cleanMessage = res.data
                .replace(/<br\s*\/?>/g, "") // Replace <br/> with newline
                .replace(/<[^>]*>/g, ""); // Remove any other HTML tags Remove extra whitespace

            console.log("cleanMessage", cleanMessage);

            // Add chat to chat list state
            const newChat: Chat = {
                id: uuid(),
                message: cleanMessage,
                // task: res.data.task,
                is_bot: true,
            };
            dispatch(addChatSuccess(newChat));
        } else if (res.data.message) {
            // If status is not 200, 201, 204, but have message then dispatch error message
            dispatch(setError(res.data.message));
        } else {
            throw new Error("Có lỗi xảy ra khi chat với bot");
        }
    } catch (error) {
        // If error then dispatch error message
        dispatch(setError("Có lỗi xảy ra khi chat với bot"));
        dispatch(stopLoading());
    }
}
