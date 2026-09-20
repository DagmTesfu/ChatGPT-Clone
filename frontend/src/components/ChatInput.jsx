
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const models = [
    {
        id: "llama3.2",
        name: "Llama3.2",
        description: "Great for everyday tasks",
    },
    {
        id: "gpt-5.6-mini",
        name: "GPT-5.6 Mini",
        description: "Fast and efficient",
    },
   
];


export default function ChatInput({
    isChatSelected,
    onSend,
    isLoading
}) {
    const [input, setInput] = useState("");
    const [selectedModel, setSelectedModel] = useState(models[0]);


    function handleSend() {
        if (!input.trim() || isLoading) return;

        onSend(input, selectedModel.id);
        setInput("");
    }


    function handleKeyDown(event) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
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

                {/* Plus button */}
                <button
                    className="input-btn plus-btn"
                    type="button"
                >
                    +
                </button>


                {/* Model selector */}
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="model-selector"
                            disabled={isLoading}
                        >
                            <span>
                                {selectedModel.name}
                            </span>

                            <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent
                        align="start"
                        className="w-64"
                    >

                        {models.map((model) => (
                            <DropdownMenuItem
                                key={model.id}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("selected",model)
                                    setSelectedModel(model)
                                }}
                                className="cursor-pointer"
                            >
                                <div>
                                    <div className="font-medium">
                                        {model.name}
                                    </div>

                                    <div className="text-xs text-muted-foreground">
                                        {model.description}
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}

                    </DropdownMenuContent>

                </DropdownMenu>


                {/* Message input */}
                <textarea
                    className="message-input"
                    placeholder={isLoading ? "waiting for response..." : "Ask ChatGpt"}
                    rows="1"
                    value={input}

                    onChange={function (event) {
                        setInput(event.target.value);
                    }}

                    onKeyDown={handleKeyDown}
                />


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
                        <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                </button>


                {/* Send */}
                <button
                    className="send-btn"
                    type="button"
                    onClick={handleSend}
                    disabled={isLoading}
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


