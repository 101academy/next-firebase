'use client'

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignOut() {

  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.push('/');
  } 

    return (
        <button 
            className="hover:bg-gray-600 my-8 rounded-xl py-2 px-4 text-white bg-black" 
            onClick={handleSignOut}
        >Sign Out</button>
    );
  }
  