/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import { v4 as uuid } from "uuid";
import useSpeechToText from "react-hook-speech-to-text";
import { RootState } from "../../../redux/store";
import { Chat, addChatSuccess } from "@/redux/slices/chat-slice";
import PostChatBot from "@/api/chat/post-chatbot";
import MarkdownRenderer from "@/utils/markdown-renderer/markdown-renderer";

function ChatFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isButtonDragging, setIsButtonDragging] = useState(false);
    const [size, setSize] = useState({ width: 640, height: 480 });
    const [isResizing, setIsResizing] = useState(false);
    const chatList = useSelector((state: RootState) => state.chat.chat);
    const isLoading = useSelector((state: RootState) => state.chat.isLoading);
    const dispatch = useDispatch();
    const chatRef = useRef(null);
    const buttonRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const buttonDragStartPos = useRef({ x: 0, y: 0 });
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const resizeStartPos = useRef({ x: 0, y: 0 });
    const initialSize = useRef({ width: 0, height: 0 });
    const dragStartTime = useRef<number>(0);
    const dragThreshold = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
    const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } =
        useSpeechToText({
            continuous: true,
            useLegacyResults: false,
            speechRecognitionProperties: {
                lang: "vi-VN",
                interimResults: true,
            },
        });

    // Check if the browser supports speech recognition
    useEffect(() => {
        if (error) {
            console.log("Speech recognition not supported");
        }
    }, []);

    // Update input message when speech recognition result changes
    // useEffect(() => {
    //     if (results.length > 0) {
    //         // Get the last result
    //         const lastResult = results[results.length - 1];
    //         if (typeof lastResult !== "string" && lastResult.transcript) {
    //             setInputMessage(lastResult.transcript);
    //         }
    //     }
    // }, [results]);

    // Update input message when interim result changes
    useEffect(() => {
        if (interimResult) {
            setInputMessage(interimResult);
        }
    }, [interimResult]);

    useEffect(() => {
        if (chatList.length > 0 && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatList, isOpen]);

    // Prevent page scroll when chat is open
    useEffect(() => {
        const preventScroll = (e: WheelEvent | TouchEvent) => {
            const target = e.target as Node;
            const chatContainer = chatContainerRef.current;

            if (isOpen && chatContainer && !chatContainer.contains(target)) {
                e.preventDefault();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("wheel", preventScroll, { passive: false });
            document.addEventListener("touchmove", preventScroll, { passive: false });
            // Remove the keydown event listener or modify it to only prevent specific keys
        }

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("wheel", preventScroll);
            document.removeEventListener("touchmove", preventScroll);
            // Update cleanup if you keep a modified keydown listener
        };
    }, [isOpen]);

    // updaten chat list when chatList change to local storage
    useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(chatList));
    }, [chatList]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest(".resize-handle")) return;
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleButtonMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsButtonDragging(true);
        dragStartTime.current = Date.now();
        dragThreshold.current = { startX: e.clientX, startY: e.clientY };
        buttonDragStartPos.current = {
            x: e.clientX - buttonPosition.x,
            y: e.clientY - buttonPosition.y,
        };
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        resizeStartPos.current = {
            x: e.clientX,
            y: e.clientY,
        };
        initialSize.current = {
            width: size.width,
            height: size.height,
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - dragStartPos.current.x;
            const newY = e.clientY - dragStartPos.current.y;
            setPosition({ x: newX, y: newY });
            // Update button position to match dialog position
            setButtonPosition({ x: newX, y: newY });
        }
        if (isButtonDragging) {
            const newX = e.clientX - buttonDragStartPos.current.x;
            const newY = e.clientY - buttonDragStartPos.current.y;
            setButtonPosition({ x: newX, y: newY });
            // Update dialog position to match button position
            setPosition({ x: newX, y: newY });
        }
        if (isResizing) {
            const deltaX = e.clientX - resizeStartPos.current.x;
            const deltaY = e.clientY - resizeStartPos.current.y;

            const newWidth = Math.max(320, initialSize.current.width + deltaX);
            const newHeight = Math.max(400, initialSize.current.height + deltaY);

            setSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsButtonDragging(false);
        setIsResizing(false);
    };

    useEffect(() => {
        if (isDragging || isResizing || isButtonDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing, isButtonDragging]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newMessage: Chat = {
            id: uuid(),
            message: inputMessage,
            is_bot: false,
        };
        const message = inputMessage;
        setInputMessage("");
        dispatch(addChatSuccess(newMessage));
        await PostChatBot(message, dispatch, chatList);
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(
            (e.clientX - dragThreshold.current.startX) ** 2 +
                (e.clientY - dragThreshold.current.startY) ** 2,
        );

        // Only open if it was a genuine click (short duration and minimal movement)
        if (dragDuration < 200 && dragDistance < 5) {
            setIsOpen(true);
        }
    };
    return (
        <>
            {!isOpen && (
                <div
                    ref={buttonRef}
                    style={{
                        transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                    }}
                    className="fixed z-[300] bottom-6 right-6 cursor-move"
                    onMouseDown={handleButtonMouseDown}
                    onClick={handleButtonClick}
                >
                    <button
                        type="button"
                        className="w-14 h-14 rounded-full bg-[#3758F9] text-white shadow-lg hover:bg-[#1C3FB7] transition-all duration-200 flex items-center justify-center"
                    >
                        <MessageCircle size={24} />
                    </button>
                </div>
            )}

            {isOpen && (
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                    }}
                    className="fixed z-[300] bottom-6 right-6 flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden"
                    ref={chatRef}
                >
                    {/* Header */}
                    <div
                        onMouseDown={handleMouseDown}
                        className="bg-[#3758F9] px-4 py-3 cursor-move flex items-center justify-between"
                    >
                        <h2 className="text-white font-medium">Chat Bot</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-[#1C3FB7] p-1 rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Container */}
                    <div
                        ref={chatContainerRef}
                        id="chat-container"
                        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                    >
                        {chatList.map((chat) => (
                            <div
                                key={chat.id}
                                className={`flex ${chat.is_bot ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[80%] markdown-content p-3 rounded-lg ${
                                        chat.is_bot
                                            ? "bg-white text-gray-800 shadow-md"
                                            : "bg-[#3758F9] text-white shadow-sm"
                                    }`}
                                >
                                    {/* Render markdown */}
                                    {/* <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkBreaks]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            table({ children }) {
                                                return (
                                                    <table>
                                                        <tbody>{children}</tbody>
                                                    </table>
                                                );
                                            },
                                            th({ children }) {
                                                return <th>{children}</th>;
                                            },
                                            td({ children }) {
                                                return <td>{children}</td>;
                                            },
                                        }}
                                    >
                                        {chat.message}
                                    </ReactMarkdown> */}
                                    <MarkdownRenderer content={chat.message} />
                                    {/* <MarkdownRenderer content={chat.message} /> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                ref={inputRef}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Bạn muốn hỏi gì?"
                                className="flex-1 p-2 h-10 border rounded-lg focus:outline-none focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (isRecording) {
                                        stopSpeechToText();
                                    } else {
                                        startSpeechToText();
                                    }
                                }}
                                className="bg-[#3758F9] text-white p-2 h-10 w-10 items-center justify-center flex rounded-lg hover:bg-[#1C3FB7] transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isRecording ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 12h2m2 0h8m2 0h2"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 5v14l11-7z"
                                        />
                                    )}
                                </svg>
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#3758F9] text-white p-2 h-10 w-10 items-center justify-center flex rounded-lg hover:bg-[#1C3FB7] transition-colors disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Send size={20} />
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Resize Handle */}
                    <div
                        className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                        onMouseDown={handleResizeStart}
                    >
                        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded" />
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatFAB;
