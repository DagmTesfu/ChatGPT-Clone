import { useState } from "react";

export default function Sidebar({
    chats,
    onChatClick,
    selectedChat
}) {

    // Search only belongs to the sidebar, so keep it here
    const [searchText, setSearchText] = useState("");


    // Only show chats that match the search
    const filteredChats = chats.filter(function (item) {
        return item.title
            .toLowerCase()
            .includes(searchText.toLowerCase().trim());
    });


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


            {/* Search through chat titles */}
            <input
                type="text"
                className="textarea-11"
                placeholder="Search History"
                value={searchText}
                onChange={function (event) {
                    setSearchText(event.target.value);
                }}
            />


            <div className="chat-history">

                {filteredChats.length === 0 ? (

                    <p className="no-chat">
                        No chats found
                    </p>

                ) : (

                    filteredChats.map(function (item) {

                        // Highlight the chat that's currently open
                        const isActive =
                            selectedChat?.title === item.title;

                        return (
                            <p
                                key={item.id}
                                className={
                                    isActive
                                        ? "history-item active-chat"
                                        : "history-item"
                                }
                                onClick={function () {
                                    onChatClick(item);
                                }}
                            >
                                {item.title}
                            </p>
                        );
                    })

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