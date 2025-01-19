"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
    
    async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let email = event.currentTarget.email.value;
        let password = event.currentTarget.password.value;
        await signIn("credentials", {
            email: email,
            password: password
        });   
    }

    return (
        <form onSubmit={handleSignIn} className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]">
            <h1 className="text-center font-bold text-2xl">Sign In</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
  }
  