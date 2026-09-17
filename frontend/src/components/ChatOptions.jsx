import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatOptions({
    id,
    pinned,
    handleDelete,
    handleRename,
    handlePin
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical
                    className="p-1 rounded hover:bg-gray-200"
                    size={18}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={() => handlePin(id)}>
                    {pinned ? "Unpin" : "Pin"}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleRename(id)}>
                    <Pencil />
                    Rename
                </DropdownMenuItem>

                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(id)}
                >
                    <Trash2 />
                    Delete
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}