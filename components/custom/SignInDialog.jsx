import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lookup from "@/data/Lookup";
import Colors from "@/data/Colors";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuid4 } from "uuid";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";


function SignInDialog({ openDialog, closeDialog }) {  
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const createUser = useMutation(api.createUser.createUser); 

    const googleLogin = useGoogleLogin({  
        onSuccess: async (tokenResponse) => {  
            try {
                const userInfo = await axios.get(  
                    'https://www.googleapis.com/oauth2/v3/userinfo',  
                    { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } }  
                );  

                const user = userInfo.data;

                await createUser({
                    name: user?.name,  
                    email: user?.email,  
                    picture: user?.picture,  
                    uid: uuid4()
                });

                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(user));
                }

                setUserDetail(user);
                closeDialog(false);

            } catch (error) {
                console.error("Error during sign-in or user creation:", error);
            }
        },  
        onError: (errorResponse) => {
            console.error("Google login error:", errorResponse);
        },  
    });  

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>  
                <DialogHeader>  
                    <DialogTitle></DialogTitle>  
                    <DialogDescription>  
                        <div className='flex flex-col items-center justify-center gap-3'>  
                            <div><h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_SUBHEADING}</h2></div> 
                            <div className='mt-2 text-center text-white'>{Lookup.SIGNIN_SUBHEADING}</div>  
                            <Button 
                                className="bg-blue-500 text-white hover:bg-blue-400 mt-3" 
                                onClick={googleLogin}
                            >
                                Sign In With Google
                            </Button>  
                            <p className="text-white">{Lookup.SIGNIN_AGREEMENT_TEXT}</p>  
                        </div>  
                    </DialogDescription>  
                </DialogHeader>  
            </DialogContent>  
        </Dialog>
    );
}

export default SignInDialog;
