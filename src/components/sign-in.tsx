import { signIn } from "@/actions/nextAuth"

export default function SignIn() {

    return (
        <form 
            action={async (formData:FormData) => {
                "use server"
                await signIn("credentials", {
                    email: formData.get('email'),
                    password: formData.get('password')
                });
            }} 
            className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]"
        >
            <h1 className="text-center font-bold text-2xl">Sign In</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
  }
  