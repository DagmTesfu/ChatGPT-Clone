import { useState } from "react";
import ChatOptions from "./ChatOptions";

export default function Sidebar({
    chats,
    onChatClick,
    selectedChat,
    handleDelete,
    handleRename
}) {
    const [searchText, setSearchText] = useState("");

    // Keep only chats that match the search
    const filteredChats = chats.filter((chat) =>
        chat.title
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
    );

    return (
        <div className="side-bar">

            <h1 className="p1">
                ChatGPT
            </h1>

            <div className="p2-text">
                <p>New Chat</p>
                <p>Library</p>
                <p>Scheduled</p>
                <p>Plugins</p>
                <p>More</p>
            </div>

            <h2 className="hh-1">
                Chats
            </h2>

            <input
                type="text"
                className="textarea-11"
                placeholder="Search History"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="chat-history">

                {filteredChats.length === 0 ? (

                    <p className="no-chat">
                        No chats found
                    </p>

                ) : (

                    filteredChats.map((chat) => (
                        <p
                            key={chat.id}

                            className={
                                selectedChat?.title === chat.title
                                    ? "history-item active-chat"
                                    : "history-item"
                                    
                            }

                            onClick={() => onChatClick(chat)}
                        >
                            {chat.title}
                            <span onClick={(e) => e.stopPropagation()}>
                             <ChatOptions 
                             id={chat.id}
                             handleDelete={handleDelete}
                             handleRename={handleRename}/>
                             </span>
                        </p>
                        
                    ))

                )}

            </div>

            <div className="footer">

                <footer>
                    Dagmawi Tesfu
                </footer>

                <button className="ft-btn">
                    Upgrade
                </button>

            </div>

        </div>
    );
}