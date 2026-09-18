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

     async function userData(){
            try{
                const response = await axios.get("http://localhost:3000/api/lists");
                
                if(!response){
                    console.log("Error Occured");                    
                }
                setChatList(response.data);
           } catch(err){
            console.log("Error Occured",err);
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


   async function handleSend(text, model) {
    if (!text.trim()) return;

    // NEW: Show message + loading immediately
    setSelectedChat({
        id: Date.now(),
        title: text,
        messages: [
            { id: Date.now(), role: "user", text },
            { id: Date.now() + 1, role: "assistant", text: "", loading: true }
        ]
    });

    try {
        const response = await axios.post(
            "http://localhost:3000/api/conversations",
            { text }
        );

        const response2 = await axios.post(
            "http://localhost:3000/api/chat",
            {
                model,
                messages: [

                    { 

                    role: "user", 
                    content: text 

                }
            ]
            }
        );

        const conversation = response.data.conversation;
        const assistantText = response2.data.response.message.content;

        // UPDATED: Replace loading message with Ollama response
        setSelectedChat({
            ...conversation,
            messages: [
                // Take all the existing messages and put them into this new array.
                ...(conversation.messages || []),

                // Display the assistant message 
                {
                    id: Date.now(),
                    role: "assistant",
                    text: assistantText
                }
            ]
        });

        userData();

    } catch (error) {
        console.log("Error:", error.message);
        console.log("Backend response:", error.response?.data);
    }
}


    async function handleChatClick(chatItem){
        try{
            const response = await axios.get(`http://localhost:3000/api/conversation`, {
                params: { title: chatItem.title }
            });

             const data = response.data;
        console.log(data);
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
