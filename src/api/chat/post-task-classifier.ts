import { AnyAction, Dispatch } from "redux";
import { Chat, addChatSuccess, fetchChatLoading, stopLoading } from "@/redux/slices/chat-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { setError } from "@/redux/slices/alert-slice";

export default async function PostTaskClassifier(
    message: string,
    dispatch: Dispatch<AnyAction>,
    chatList: Chat[],
) {
    try {
        // Perform loading when call API
        dispatch(fetchChatLoading());
        const res = await axiosClient.post("/task-classifier", {
            message,
        });
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            // Add chat to chat list state
            const newChat: Chat = {
                id: chatList.length + 1,
                message: res.data["0"],
                task: res.data.task,
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
