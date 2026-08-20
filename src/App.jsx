import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";

import {
    lists,
    searchHistory
} from "./data/chatData";

export default function App() {

    // Start with the chat data from chatData.js
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatList, setChatList] = useState(lists);
    const [conversations, setConversations] = useState(searchHistory);

    // Runs when the user sends a new message
    function handleSend(text) {
        if (!text.trim()) return;

        // Give the new chat and message their own ids
        const newId = crypto.randomUUID();
        const messageId = crypto.randomUUID();

        // This is what will show in the sidebar
        const newChatItem = {
            id: newId,
            title: text
        };

        // Build the conversation in the same shape as chatData
        const newConversation = {
            title: text,
            conversation_id: newId,

            mapping: {
                [messageId]: {
                    id: messageId,

                    message: {
                        id: messageId,

                        author: {
                            role: "user"
                        },

                        content: {
                            content_type: "text",
                            parts: [text]
                        }
                    }
                }
            }
        };

        // Put the new chat at the top of the sidebar
        setChatList(function (prev) {
            return {
                ...prev,
                items: [
                    newChatItem,
                    ...prev.items
                ]
            };
        });

        // Keep the new conversation with the rest of the chats
        setConversations(function (prev) {
            return [
                newConversation,
                ...prev
            ];
        });

        // Open the chat right after it is created
        setSelectedChat(newConversation);
    }


    // Find the conversation that belongs to the clicked sidebar item
    function handleChatClick(chatItem) {
        const foundChat = conversations.find(function (chat) {
            return chat.title === chatItem.title;
        });

        setSelectedChat(foundChat || null);
    }


    return (
        <div className="container">

            <Sidebar
                chats={chatList.items}
                onChatClick={handleChatClick}
                selectedChat={selectedChat}
            />

            <div className="main-body">

                <ChatHeader />

                <ChatArea
                    conversation={selectedChat}
                />

                <ChatInput
                    isChatSelected={selectedChat !== null}
                    onSend={handleSend}
                />

            </div>

        </div>
    );
}