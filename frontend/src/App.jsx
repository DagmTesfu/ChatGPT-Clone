import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
// import { Content } from "node_modules/@base-ui/react/drawer/index.parts";
import axios from "axios";


export default function App() {
    const [selectedChat, setSelectedChat] = useState(null);

    // We only need the items array for the sidebar
    const [chatList, setChatList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function userData() {
    try {
        const response = await axios.get(
            "http://localhost:3000/api/lists"
        );

        setChatList(response.data);

    } catch (err) {
        console.log("Error Occured", err);
    }
}

    useEffect(() => {
       
        userData();

    }, [])
    
        //Delete Function
    // const handleDelete = (idToRemove) => {
    //     const updatedData = chatList.filter(
    //         (chat) => chat.id !== idToRemove
    //     );

    // setChatList(updatedData);
    // };

    async function handleDelete(id) {
        const url = `http://localhost:3000/api/conversations/${id}`

        try{
            const response = await axios.delete(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // const data = response.data;
            console.log(response.data);
            

            

        } catch(error){
            console.log("Error has Occured", error);
            
        }
    } 

    // Pin Function
        // we're passing the ID of the chat
   const handlePin = async (id) => {
    console.log("PIN CLICKED:", id);

    try {
        // we send that ID to the backend
        const response = await axios.patch(
            `http://localhost:3000/api/conversations/${id}/pin`
        );

        console.log("PIN RESPONSE:", response.data);

        // React updates its chatList
        const updatedChat = response.data.chat;

        setChatList(prev =>
            prev.map(chat =>
                chat.id === id
                    ? updatedChat
                    : chat
            )
        );

    } catch (error) {
        console.error(
            "PIN ERROR:",
            error.response?.data || error.message
        );
    }
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

    function handleNewChat() {
    setSelectedChat(null);
}

    async function handleSend(text, model) {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    const userMessage = {
        id: Date.now(),
        role: "user",
        text
    };

    const loadingMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: "",
        loading: true
    };

    try {
        setSelectedChat(prev => ({
            ...(prev || { title: text }),
            messages: [
                ...(prev?.messages || []),
                userMessage,
                loadingMessage
            ]
        }));

        const response = await fetch(
            "http://localhost:3000/api/conversations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text,
                    model,
                    conversationId: selectedChat?.conversation_id || null
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to send message");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let assistantText = "";
        let conversationId =
            selectedChat?.conversation_id || null;

        while (true) {
            const { value, done } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, {
                stream: true
            });

            for (const line of chunk.split("\n")) {
                if (!line.startsWith("data:")) continue;

                const data = JSON.parse(
                    line.slice(5).trim()
                );

                if (data.conversationId) {
                    conversationId = data.conversationId;
                }

                if (data.content) {
                    assistantText += data.content;

                    setSelectedChat(prev => ({
                        ...prev,
                        conversation_id: conversationId,
                        messages: prev.messages.map(message =>
                            message.loading
                                ? {
                                    ...message,
                                    text: assistantText
                                }
                                : message
                        )
                    }));
                }

                if (data.done) {
                    setSelectedChat(prev => ({
                        ...prev,
                        conversation_id: conversationId,
                        messages: prev.messages.map(message =>
                            message.loading
                                ? {
                                    ...message,
                                    text: assistantText,
                                    loading: false
                                }
                                : message
                        )
                    }));
                }
            }
        }

        userData();

    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        setIsLoading(false);
    }
}


    async function handleChatClick(chatItem){
        try{
            const response = await axios.get(`http://localhost:3000/api/conversation`, {
                params: { title: chatItem.title }
            });

             const data = response.data;
        console.log("conversation data",data);
        setSelectedChat(data); 
        } catch(err){
            console.log(err);
            
        }          
    }


    return (
        <div className="container">

            <Sidebar
                chats={chatList}
                onChatClick={handleChatClick}
                selectedChat={selectedChat}
                handleDelete={handleDelete}
                handleRename={handleRename}
                handlePin={handlePin}
                handleNewChat={handleNewChat}
            />

            <div className="main-body">

                <ChatHeader />

                <ChatArea
                    conversation={selectedChat}
                />

                <ChatInput
                    isChatSelected={selectedChat !== null}
                    onSend={handleSend}
                    isLoading={isLoading}
                />

            </div>

        </div>
    );
}
