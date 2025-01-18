'use client'

import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import { useAuthContext } from "@/contexts/AuthContext";

export default function TodoLayout({children}: {
    children: React.ReactElement
}) {

    const authObj = useAuthContext();
    console.log(`authObj: ${authObj}`);
    const isAuthenticated = authObj.userInfo ? true: false;
    return (
      <>
        {isAuthenticated ? 
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
  