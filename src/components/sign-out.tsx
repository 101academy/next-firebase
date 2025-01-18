'use client'

import { logout } from "@/actions/authActions";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignOut() {

  const router = useRouter();
  const {setUserInfo} = useAuthContext();
  
  async function handleSignOut() {
    await logout();
    setUserInfo(null);
    router.push('/');
  } 

    return (
        <button 
            className="hover:bg-gray-600 my-8 rounded-xl py-2 px-4 text-white bg-black" 
            onClick={handleSignOut}
        >Sign Out</button>
    );
  }
  