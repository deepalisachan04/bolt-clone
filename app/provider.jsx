"use client"
import React, { Children } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/header'
import Hero from '@/components/custom/Hero'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { query } from 'convex'


function Provider({children}) {
  const [message, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState();
  const convex = useConvex();


  useEffect(() => {
    IsAuthenticated();
  }, [])

  const IsAuthenticated =async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));

      //fetch from database
      const result = await convex.query(api.users.GetUser,
        { email: user?.email }
      )
      setUserDetail(result);
      console.log(result);
    }
  }


  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value = {{userDetail, setUserDetail}}>
          <MessagesContext.Provider value = {{message, setMessages}}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
                >
                  <Header/>
                    {children}
              </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Provider;
