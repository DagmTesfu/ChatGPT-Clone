import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ChatArea({ conversation }) {

    if (!conversation) {
        return (
            <div className="chat-area">

                <div className="empty-chat">
                    <h1>What's on your mind today?</h1>
                </div>

            </div>
        );
    }


    let messages = [];


    // New chats created inside our app
    if (conversation.messages) {
        messages = conversation.messages;
    }


    // Old chats coming from chatData.js
    else if (conversation.mapping) {

        messages = Object.values(conversation.mapping)
            .filter(function (item) {

                return (
                    item.message &&
                    item.message.content.content_type === "text" &&
                    (
                        item.message.author.role === "user" ||
                        item.message.author.role === "assistant"
                    )
                );

            })
            .map(function (item) {

                return {
                    id: item.id,
                    role: item.message.author.role,
                    text: item.message.content.parts[0]
                };

            });
    }


    return (
        <div className="chat-area">

            <div className="conversation-title">
                {conversation.title}
            </div>


            <div className="chats">

                {messages.map(function (message) {

    return (
        <div
            key={message.id}
            className={`message ${message.role}`}
        >
            {message.loading && !message.text ? (
                <div className="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                </ReactMarkdown>
)}
        </div>
    );

})}

            </div>

        </div>
    );
}