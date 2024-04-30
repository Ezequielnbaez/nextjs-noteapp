"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { useSettings } from "@/hooks/use-settings";
import { useSearch } from "@/hooks/use-search";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { Navbar } from "./navbar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const Icon = isCollapsed ? ChevronRightIcon : ChevronLeftIcon;
  const create = useMutation(api.documents.create);
  const settings = useSettings();
  const search = useSearch();
  const params = useParams();
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new document",
      success: "New document created",
      error: "Error creating document",
    });
  };

  const changeWidth = () => {
    if (isCollapsed) {
      if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(false);
        sidebarRef.current.style.width = "287px";
        navbarRef.current.style.setProperty("width", "calc(100% - 287px)");
        navbarRef.current.style.setProperty("left", "287px");
      }
    } else {
      if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(true);
        sidebarRef.current.style.width = "0";
        navbarRef.current.style.setProperty("width", "100%");
        navbarRef.current.style.setProperty("left", "0px");
      }
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          " bg-secondary flex z-[99999] w-72 transition-all ease-in-out"
        )}
      >
        <div
          className={cn({
            "flex flex-col justify-between": true,
          })}
        >
          <div
            className={cn({
              flex: true,
              "p-4 justify-between": !isCollapsed,
              "py-4 justify-center": isCollapsed,
            })}
          >
            {!isCollapsed && (
              <>
                <div>
                  <UserItem />
                  <br></br>
                  <Item
                    label="Search"
                    icon={Search}
                    isSearch
                    onClick={search.onOpen}
                  />
                  <Item
                    label="Settings"
                    icon={Settings}
                    isSearch
                    onClick={settings.onOpen}
                  />
                  <Item
                    onClick={handleCreate}
                    label="New page"
                    icon={PlusCircle}
                  />
                  <div className="mt-4">
                    <DocumentList />
                  </div>
                  <Popover>
                    <PopoverTrigger className="w-full mt-4">
                      <Item label="Trash" icon={Trash} isSearch />
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-72" side={"right"}>
                      <TrashBox />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            <button
              className={cn({
                "grid place-content-center": true,
                "hover:bg-indigo-800 ": true,
                "w-10 h-10 rounded-full": true,
                "transition-all duration-300": true,
                hidden: isCollapsed,
              })}
              onClick={changeWidth}
            >
              <Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn("absolute top-0 z-[99999] left-72 w-[calc(100%-287px)]")}
      >
        {!!params.documentId ? (
          <Navbar collapsed={isCollapsed} changeWidth={changeWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={changeWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
export default Navigation;
