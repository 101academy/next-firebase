'use client'

import { login } from "@/actions/authActions";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState<boolean>(false);
    const {setUserInfo} = useAuthContext();

    function handleSignIn(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        let email = event.currentTarget.email.value;
        let password = event.currentTarget.password.value;

        setLoading(true);

        login(email, password)
            .then((userCredential) => {
                console.log('login successful');
                setUserInfo(userCredential)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }

    return (
        <form onSubmit={handleSignIn} className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]">
            <h1 className="text-center font-bold text-2xl">Sign In</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
            {/* <a href="/sign-up" >Sign Up</a> */}
            <p>{loading && "Signing In..."}</p>
        </form>
    );
  }
  