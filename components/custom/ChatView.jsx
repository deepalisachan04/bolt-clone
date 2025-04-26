"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useConvex } from "convex/react";
import { lookup } from "dns";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { MessagesContext, setMessages } = useContext(MessagesContext);
    const { userInput, setUserInput } = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        id && GetWorkspaceData();
    }, [id])
    /**
     * Use to get workspace data using Workspace Id
     */
    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        setMessages(result?.messages)
    }

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role == 'user') {
               // GetAiResponse()
            }
        }
    }, [messages])

    const GetAiResponse = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
        const result = await axios.post('/api/api-chat', {
            prompt: PROMPT
        });
        console.log(result.data.result);
        setMessages(prev => [...prev, {
            role: 'ai',
            content: result.data.result
        }])
        setLoading(false);
    }

    return (
        <div className="relative h-[86vh] flex flex-col">
            <div className="flex-1 overflow-y-scroll">
                {messages?.map((msg, index) => (
                    <div key={index}
                        className="p-3 rounded-lg mb-2 flex gap-3 items-center"
                        style={{
                            backgroundColorColors: Colors.CHAT_BACKGROUND
                        }}>
                        {msg?.role == 'user' &&
                            <Image src={userDetail?.picture} alt='userImage' width={35} height={35} className='rounded-full' />}
                        <h2>{msg.content}</h2>

                    </div>
                ))}
                {loading && 
                <div className="p-3 rounded-lg mb-2 flex gap-3 items-center"
                style={{
                    backgroundColor: Colors.CHAT_BACKGROUND
                }}>
                    <Loader2Icon className="animate-spin" />
                    <h2>Generating response......</h2>
                </div>
                }
            </div>
            <div className='p-5 border rounded-xl max-w-2xl w-full mt-3 relative' style={{ backgroundColor: Colors.BACKGROUND }}>
                <div className='flex gap-2'>
                    <textarea
                        placeholder={lookup.INPUT_PLACEHOLDER || "Describe your dream project... 💡"}
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white-700'
                    />
                    {userInput && (
                        <ArrowRight
                            onClick={() => onGenerate(userInput)}
                            className={`p-2 h-10 w-10 rounded-md cursor-pointer transition-all
                          bg-blue-500 hover:bg-blue-600 text-white`}
                        />
                    )}
                </div>
                <div>
                    <Link className='h-5 w-5' />
                </div>
            </div>
        </div>
    )
}

export default ChatView;