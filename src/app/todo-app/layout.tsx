'use client'

import SignIn from "@/components/sign-in";
import useAuth from "@/hooks/useAuth";

export default function TodoLayout({children}: {
    children: React.ReactElement
}) {
    const isAuthenticated = useAuth();
    return (
      <>
        {isAuthenticated ? 
            <>{children}</>
            : 
            <div className="w-screen h-screen flex justify-between align-middle bg-gray-100">
                <SignIn />
            </div>
        }
      </>
    );
  }
  