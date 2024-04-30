"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { useUser } from "@clerk/clerk-react";
import { Menu } from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
  collapsed: boolean;
  changeWidth: () => void;
}

export const Navbar = ({ collapsed, changeWidth }: NavbarProps) => {
  const params = useParams();
  const archive = useMutation(api.documents.archive);
  const { user } = useUser();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {collapsed && (
          <MenuIcon
            role="button"
            onClick={changeWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center justify-between">
            <Publish initialData={document} />
            <Menu id={document._id} />
          </div>  
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
