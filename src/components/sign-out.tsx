'use client'

import { useAuthContext } from "@/contexts/AuthContext";

export default function SignOut() {

  const {logout} = useAuthContext();
  
  async function handleSignOut() {
    await logout();
  } 

    return (
        <button 
            className="hover:bg-gray-600 my-8 rounded-xl py-2 px-4 text-white bg-black" 
            onClick={handleSignOut}
        >Sign Out</button>
    );
  }
  