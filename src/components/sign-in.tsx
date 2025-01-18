'use client'

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSignIn(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        
        let email = event.currentTarget.email.value;
        let password = event.currentTarget.password.value;

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    function handleSignUp() {
        
        let email = document.getElementsByName('email')[0] as HTMLInputElement;
        let password = document.getElementsByName('password')[0] as HTMLInputElement;

        setLoading(true);

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    return (
        <form onSubmit={handleSignIn} className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]">
            <h1 className="text-center font-bold text-2xl">Sign In</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <p>{loading && "Signing In..."}</p>
        </form>
    );
  }
  