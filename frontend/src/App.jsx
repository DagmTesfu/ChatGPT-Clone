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


    // Rename Function
    const handleRename = (id) => {
        const newTitle = prompt("Enter new Title")
        if (!newTitle || newTitle.trim() === '') return;
        
        const updatedData = chatList.map((chat) => (
            chat.id === id ? {...chat, title: newTitle} : chat
        ))
        setChatList(updatedData);

        
    }

    async function handleSend(text, model){
        // stops if user entered empty space or value
        if(!text.trim()) return;

        try{
            const response = await axios.post("http://localhost:3000/api/conversations", {
                text: text
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const response2 = await axios.post("http://localhost:3000/api/chat", {
            
                model: model,
                message: [
                    {
                        role: "user",
                        Content: text
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    

            console.log(response2);
            


        

        if(response.status !== 200 && response.status !== 201) {
            throw new Error("COuld not create conversation");
        }

        const data = response.data;

        // display the message in chatarea
        userData();

        // select new conversations
        setSelectedChat(data.conversation);
    } catch(error){
        console.log("Error message", error);        
    }
}


    async function handleChatClick(chatItem){
        try{
            const response = await axios.get(`http://localhost:3000/api/conversation`, {
                params: { title: chatItem.title }
            });

            const data = response.data;
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
