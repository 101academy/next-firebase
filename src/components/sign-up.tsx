'use client'

import { register } from "@/actions/authActions";
import { useState } from "react";

export default function SignUp() {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSignUp() {
        
        let email = document.getElementsByName('email')[0] as HTMLInputElement;
        let password = document.getElementsByName('password')[0] as HTMLInputElement;

        setLoading(true);

        register(email.value, password.value)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }

    return (
        <form onSubmit={handleSignUp} className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]">
            <h1 className="text-center font-bold text-2xl">Register</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
            {/* <a href="/to-do">Sign In</a> */}
            <p>{loading && "Registering..."}</p>
        </form>
    );
  }
  