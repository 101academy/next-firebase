import { auth } from "@/actions/nextAuth";
import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";

export default async function TodoLayout({children}: {
    children: React.ReactElement
}) {
    const session = await auth();
    
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
  