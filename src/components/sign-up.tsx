import { register } from "@/actions/authActions";

export default function SignUp() {

    return (
        <form action={ async(formData:FormData) => {
            "use server"
            register(formData.get('email') as string, formData.get('password') as string);
        }
        } className="flex flex-col shadow-md p-8 gap-8 rounded-lg bg-white m-auto w-[50%] md:w-[30%] xl:w-[20%]">
            <h1 className="text-center font-bold text-2xl">Register</h1>
            <input type="text" name="email" placeholder="Email" required  />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
  }
  