import { signOut } from "next-auth/react";

export default function SignOut() {

  async function handleSignOut() {
    await signOut();
  } 

    return (
        <button 
            className="hover:bg-gray-600 my-8 rounded-xl py-2 px-4 text-white bg-black" 
            onClick={handleSignOut}
        >Sign Out</button>
    );
  }
  