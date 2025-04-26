"use client"
import React, { Children } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import Hero from '@/components/custom/Hero'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { query } from 'convex'
import { useRouter } from 'next/navigation';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';


function Provider({ children }) {
  const [message, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState();
  const convex = useConvex();


  useEffect(() => {
    IsAuthenticated();
  }, [])

  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) return;
      //fetch from database
      const result = await convex.query(api.users.GetUser,
        { email: user?.email }
      );
      setUserDetail(result);
      console.log(result);
      if (result?.workspaceId) {
        router.push(`/workspace/${result.workspaceId}`);
      }
    }
  }


  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <MessagesContext.Provider value={{ message, setMessages }}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                <Hero />
                {children}
              </NextThemesProvider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  )
}

export default Provider;
