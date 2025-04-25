"use client";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function ChatView(){
    const {id}=useParams();
    const convex=useConvex();

    useEffect(()=>{
        id&&GetWorkspaceData();
    },[id])
    /**
     * Use to get workspace data using Workspace Id
     */
    const GetWorkspaceData=async()=>{
        const result=await convex.query(api.workspace.GetWorkspace,{
            workspaceId:id
        });
    }
    return(
        <div>ChatView</div>
    )
}

export default ChatView;