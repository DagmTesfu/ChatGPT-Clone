import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";

import { lists, searchHistory } from "./data/chatData";

export default function App() {
    const [selectedChat, setSelectedChat] = useState(null);

    // We only need the items array for the sidebar
    const [chatList, setChatList] = useState(lists.items);

    // Full conversations
    const [conversations, setConversations] = useState(searchHistory);
    
        //Delete Function
    const handleDelete = (idToRemove) => {
        const updatedData = chatList.filter(
            (chat) => chat.id !== idToRemove
        );

    setChatList(updatedData);
    };


    // Rename Function
    const handleRename = (id) => {
        const newTitle = prompt("Enter new Title")
        if (!newTitle || newTitle.trim() === '') return;
        
        const updatedData = chatList.map((chat) => (
            chat.id === id ? {...chat, title: newTitle} : chat
        ))
        setChatList(updatedData);

        
    }

    function handleSend(text) {
        if (!text.trim()) return;

        const chatId = crypto.randomUUID();

        const newChat = {
            id: chatId,
            title: text
        };

        const newConversation = {
            conversation_id: chatId,
            title: text,

            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "user",
                    text: text
                }
            ]
        };

        // Add the title to the sidebar
        setChatList(function (oldChats) {
            return [newChat, ...oldChats];
        });

        // Save the conversation
        setConversations(function (oldConversations) {
            return [newConversation, ...oldConversations];
        });

        // Open it right away
        setSelectedChat(newConversation);
    }


    function handleChatClick(chatItem) {
        const foundChat = conversations.find(function (chat) {
            return chat.title === chatItem.title;
        });

        setSelectedChat(foundChat || null);
    }


    return (
        <div className="container">

            <Sidebar
                chats={chatList}
                onChatClick={handleChatClick}
                selectedChat={selectedChat}
                handleDelete={handleDelete}
                handleRename={handleRename}
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