import { register } from "@/actions/authActions";
import { useState } from "react";

export default function SignUp() {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        let email = event.currentTarget.email.value;
        let password = event.currentTarget.password.value;

        setLoading(true);

        register(email, password)
            .then((responseObj) => {
                if(responseObj == true) {
                    console.log('registation successful');
                }
                else {
                    console.error(responseObj);
                }
                setLoading(false);
            });
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
  