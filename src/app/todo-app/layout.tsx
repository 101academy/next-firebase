"use client"

import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import { useSession } from "next-auth/react";

export default function TodoLayout({children}: {
    children: React.ReactElement
}) {
    const { data: session } = useSession()
    
    return (
      <>
        {session ? 
            <>{children}</>
            :
            <div className="w-screen h-screen flex justify-between align-middle bg-gray-100">
                <SignIn />
                <SignUp />
            </div>
        }
        </>
    );
  }
  