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

    const messages = Object.values(
        conversation.mapping
    ).filter(function (item) {

        return (
    item.message &&
    item.message.content.content_type === "text" &&
    (
        item.message.author.role === "user" ||
        item.message.author.role === "assistant"
    )
);

    });

    return (
        <div className="chat-area">

            <div className="conversation-title">
                {conversation.title}
            </div>

            <div className="chats">

                {messages.map(function (item) {

                    const role =
                        item.message.author.role;

                    const text =
                        item.message.content.parts[0];

                    return (
                        <div
                            key={item.id}
                            className={`message ${role}`}
                        >
                            {text}
                        </div>
                    );

                })}

            </div>

        </div>
    );
}