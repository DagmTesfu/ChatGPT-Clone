import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";


export default function App() {
    const [selectedChat, setSelectedChat] = useState(null);

    // We only need the items array for the sidebar
    const [chatList, setChatList] = useState([]);

   

    useEffect(() => {
        async function userData(){
            try{
                const response = await fetch("http://localhost:3000/api/lists")
                
                if(!response){
                    console.log("Error Occured");
                    
                }
                const data = await response.json();
                setChatList(data);
           } catch(err){
            console.log("Error Occured",err);
            }
        }
        userData();
    }, [])
    
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

    async function handleSend(text){
        if(!text.trim()) return;

        try{
            const response = await fetch("http://localhost:3000/api/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            })
        

        if(!response.ok) {
            throw new Error("COuld not create conversation");
        }

        const data = await response.json();

        // display the message in chatarea
        setChatList(function(oldChats){
            return [data.chat, ...oldChats];
        });

        setSelectedChat(data.conversation);
    } catch(error){
        console.log("Error message", error);
        
    }
}


    async function handleChatClick(chatItem){
        try{
            const response = await fetch(`http://localhost:3000/api/conversation?title=${chatItem.title}`)

            const data = await response.json();
        console.log(data);
        setSelectedChat(data) ; 
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