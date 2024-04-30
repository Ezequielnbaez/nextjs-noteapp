"use client";

import {useMutation, useQuery} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface DocumentIdPageProps{
    params:{
        documentId: Id<"documents">;
    }
}


const DocumentIdPage = ({
    params
}: DocumentIdPageProps) =>{
    
    const Editor = useMemo(()=>dynamic(()=>import("@/components/editor"),{ssr: false}),[])
    const update = useMutation(api.documents.update)
    const document = useQuery(api.documents.getById,{
        documentId:params.documentId
    });

    const onChange = (content:string)=>{
        update({
            documentId: params.documentId,
            content
        })
    };


    if(document === undefined){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(document === null){
        return(
            <div>
                Not found
            </div>
        )
    }
    
    return(
        <div className="h-full pb-40">
            <Cover preview url={document.coverImage}/>
            <div className="md:max-w-3x lg:md-max-w-4xl mx-auto">
                <Toolbar preview initialData={document}/>
                <Editor editable={false} onChange={onChange} initialContent={document.content}/>
            </div>
        </div>
    );
}

export default DocumentIdPage;