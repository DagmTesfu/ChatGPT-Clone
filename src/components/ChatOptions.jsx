import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatOptions({id, handleDelete, handleRename}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded hover:bg-gray-200">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick ={() => handleRename(id)}>
          <Pencil />
          Rename
        </DropdownMenuItem>

        <DropdownMenuItem variant="destructive"
        onClick ={() => handleDelete(id)}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


