"use client";

import React, { useState, useContext } from 'react';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link as LinkIcon } from 'lucide-react'; 
import Colors from '@/data/Colors'; 
import { MessagesContext } from '@/context/MessagesContext'; 
import { UserDetailContext } from '@/context/UserDetailContext';
import SignInDialog from './SignInDialog';
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import {api} from '@/convex/_generated/api';
import { v4 as uuid4 } from 'uuid';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';  


function Hero() {
  const [userInput, setUserInput] = useState("");  
  const { messages, setMessages } = useContext(MessagesContext);  
  const { userDetail } = useContext(UserDetailContext);  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();  

  // Handles the form submission and dialog logic
  const onGenerate = async (input) => {
    if (!userDetail) {
      setIsDialogOpen(true);
      return;
    }
  
    const msg = {
      role: 'user',
      content: input,
    };
  
    setMessages(msg);

    try {
      const workspaceId = await createWorkspace({
        user: userDetail._id,
        messages: [msg],
      });
    
      if (workspaceId) {
        router.push('/workspace/' + workspaceId);
      } else {
        console.error('workspaceId is missing', workspaceId);
      }
    } catch (err) {
      console.error('error creating workspace', err);
    }
    
  
    createWorkspace.mutate(
      {
        user: userDetail._id,
        message: [msg],
      },
      {
        onSuccess: (workspaceId) => {
          if (workspaceId) {
            router.push('/workspace/' + workspaceId);
          } else {
            console.error('workspaceId is missing', workspaceId);
          }
        },
        onError: (err) => {
          console.error('error creating workspace', err);
        },
      }
    )
  }  

  return (
    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
      <h2 className='font-bold text-4xl text-center'>{Lookup.SIGNIN_SUBHEADING}</h2>
      <p className='text-gray-400 font-medium text-center'>{Lookup.HERO_DESC}</p>
      
      {/* Input Box */}
      <div className='p-5 border rounded-xl max-w-2xl w-full mt-3 relative' style={{ backgroundColor: Colors.BACKGROUND }}>
        <div className='flex gap-2'>
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER || "Describe your dream project... 💡"}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white-700'
          />
          <ArrowRight 
            onClick={() => onGenerate(userInput)}
            className={`p-2 h-10 w-10 rounded-md cursor-pointer transition-all
              ${userInput ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-transparent pointer-events-none'}`}
          />
        </div>

        <div className="absolute bottom-2 left-2">
          <LinkIcon className='h-5 w-5 text-gray-500' />
        </div>
      </div>

      {/* Suggestion Buttons */}
      <div className='flex flex-wrap mt-8 max-w-xl items-center justify-center gap-3 cursor-pointer'>
        {Lookup?.SUGGESTIONS?.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-500 hover:text-white"
          >
            {suggestion}
          </h2>
        ))}
      </div>  

      {/* SignInDialog Component */}
      {/* <SignInDialog openDialog={isDialogOpen} closeDialog={setIsDialogOpen} /> */}
    </div>
  )
}

export default Hero;
