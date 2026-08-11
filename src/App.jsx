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
    const [selectedChat, setSelectedChat] = useState(null);

    function handleChatClick(chatItem) {
        if (chatItem.title === "Work Session Start") {
            setSelectedChat({
                ...searchHistory,
                title: chatItem.title
            });
        } else {
            setSelectedChat(null);
        }
    }

    return (
        <div className="container">

            <Sidebar
                chats={lists.items}
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
                />

            </div>

        </div>
    );
}
