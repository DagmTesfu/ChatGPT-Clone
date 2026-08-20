import { useState } from "react";

export default function ChatInput({
    isChatSelected,
    onSend
}) {

    // Keeps track of what's currently inside the textarea
    const [input, setInput] = useState("");


    function handleSend() {
        if (!input.trim()) return;

        // Send the text back up to App
        onSend(input);

        // Clear the textarea after sending
        setInput("");
    }


    function handleKeyDown(e) {

        // Enter sends the message, Shift + Enter still makes a new line
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }


    return (
        <div
            className={
                isChatSelected
                    ? "chat-input-wrapper"
                    : "chat-input-wrapper start-input"
            }
        >

            <div className="chat-input">

                {/* Add / attachment button */}
                <button
                    className="input-btn plus-btn"
                    type="button"
                >
                    +
                </button>


                {/* Main message box */}
                <textarea
                    className="message-input"
                    placeholder="Ask ChatGPT"
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></textarea>


                {/* Microphone */}
                <button
                    className="input-btn mic-btn"
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />

                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />

                        <line
                            x1="12"
                            y1="19"
                            x2="12"
                            y2="22"
                        />
                    </svg>
                </button>


                {/* Send message */}
                <button
                    className="send-btn"
                    type="button"
                    onClick={handleSend}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 19V5" />
                        <path d="M5 12l7-7 7 7" />
                    </svg>
                </button>

            </div>


            <p className="chat-warning">
                ChatGPT can make mistakes. Check important info.
            </p>

        </div>
    );
}