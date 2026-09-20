import { useState } from "react";
import ChatOptions from "./ChatOptions";

export default function Sidebar({
    chats,
    onChatClick,
    selectedChat,
    handleDelete,
    handleRename,
    handlePin,
    handleNewChat
}) {
    const [searchText, setSearchText] = useState("");

    // Keep only chats that match the search
    const filteredChats = chats.filter((chat) =>
        chat.title
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
    );

    //Give me chats that have a pinned_time
    const pinnedChats = filteredChats.filter(chat => chat.pinned_time);

    // gets everything that isn't pinned
    const normalChats = filteredChats.filter(chat => !chat.pinned_time);


    
    

    return (
        <div className="side-bar">

            <h1 className="p1">
                ChatGPT
            </h1>

            <div className="p2-text">
                <p onClick={handleNewChat}>New Chat</p>
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

        <>
            {pinnedChats.length > 0 && (
                <>
                    <h3>Pinned</h3>

                    {pinnedChats.map((chat) => (
                        <p
                            key={chat.id}
                            className={
                                selectedChat?.id === chat.id
                                    ? "history-item active-chat"
                                    : "history-item"
                            }
                            onClick={() => onChatClick(chat)}
                        >
                            {chat.title}

                            <span onClick={(e) => e.stopPropagation()}>
                                <ChatOptions
                                    id={chat.id}
                                    pinned={!!chat.pinned_time}
                                    handleDelete={handleDelete}
                                    handleRename={handleRename}
                                    handlePin={handlePin}
                                />
                            </span>
                        </p>
                    ))}
                </>
            )}

            <h3>Chats</h3>
            {normalChats.map((chat) => (
              <p
                key={chat.id}
                    className="history-item"
                    onClick={() => onChatClick(chat)}
                >
                    <span className="chat-title">
                            <span className="chat-title">
                                {chat.title}
                            </span>
                    </span>

                    <span onClick={(e) => e.stopPropagation()}>
                         
                        <ChatOptions
                            id={chat.id}
                            pinned={!!chat.pinned_time}
                            handleDelete={handleDelete}
                            handleRename={handleRename}
                            handlePin={handlePin}
                        />
                    </span>
                </p>
            ))}
        </>

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