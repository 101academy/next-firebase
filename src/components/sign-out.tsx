import { signOut } from "@/actions/nextAuth"

export default function SignOut() {

    return (
      <form action={ async() => {
        "use server"
        await signOut();
      }
      }>
        <button 
          type="submit"
          className="hover:bg-gray-600 my-8 rounded-xl py-2 px-4 text-white bg-black" 
        >
          Sign Out
        </button>
      </form>
    );
  }
  