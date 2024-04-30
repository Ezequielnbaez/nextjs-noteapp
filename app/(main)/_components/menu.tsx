import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface MenuProps {
  id?: Id<"documents">;
}

export const Menu = ({ id }: MenuProps) => {
  const { user } = useUser();
  const router = useRouter();
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Moving note to trash",
      success: "Moved to trash",
      error: "Error moving note",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <div role="button" className="">
          <MoreHorizontal />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 dark:bg-[#1F1F1F]"
        align="end"
        side="right"
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by:{user?.username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
