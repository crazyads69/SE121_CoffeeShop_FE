/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
    id: number;
    message: string;
    task: string;
    is_bot: boolean;
}

export interface ChatState {
    chat: Chat[];
    isLoading: boolean;
}

const initialState: ChatState = {
    chat: [],
    isLoading: true,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        fetchChatSuccess(state, action: PayloadAction<Chat[]>) {
            state.chat = action.payload;
            state.isLoading = false;
        },
        addChatSuccess(state, action: PayloadAction<Chat>) {
            state.chat.push(action.payload);
            state.isLoading = false; // Add this line to prevent loading state when adding new chat
        },
        fetchChatLoading(state) {
            state.isLoading = true;
        },
        stopLoading(state) {
            state.isLoading = false;
        },
    },
});

export const { fetchChatSuccess, addChatSuccess, fetchChatLoading, stopLoading } =
    chatSlice.actions;
export default chatSlice.reducer;
