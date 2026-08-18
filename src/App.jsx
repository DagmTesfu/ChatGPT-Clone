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
    // App owns the shared state because Sidebar, ChatArea, and ChatInput all use it.
    const [message, setMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState(lists.items);

    // This one function handles everything that happens when a message is submitted.
    function handleSubmit(event) {
        // Stop the form from refreshing the page.
        event.preventDefault();

        // Remove extra spaces and stop if the message is empty.
        const text = message.trim();
        if (!text) return;

        // Each message needs a unique key for the conversation mapping and React rendering.
        const messageId = crypto.randomUUID();

        // Use the same data shape that ChatArea already knows how to display.
        const newChat = {
            id: messageId,
            title: text.slice(0, 35),
            mapping: {
                [messageId]: {
                    id: messageId,
                    message: {
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

        // Adding the object to chats makes Sidebar's existing .map() display its title.
        setChats(function (currentChats) {
            return [newChat, ...currentChats];
        });

        // Selecting the same object makes ChatArea display the submitted message.
        setSelectedChat(newChat);

        // Clear the controlled textarea after a successful submission.
        setMessage(""); 
    }


    function handleChatClick(chatItem) {
    const foundChat = searchHistory.find(function (chat) {
        return chat.title === chatItem.title;
    });

    setSelectedChat(foundChat || chatItem);
}

    return (
        <div className="container">

            <Sidebar
                chats={chats}
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
                    message={message}
                    setMessage={setMessage}
                    handleSubmit={handleSubmit}
                />

            </div>

        </div>
    );
}
