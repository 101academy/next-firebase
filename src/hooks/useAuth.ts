import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [user, setLocalUser] = useState<any | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user:any) => {
            if(user) {
                console.log("User is logged in.");
                setLocalUser(user);
            } else {
                console.log("There is no user.")
            }
        });

        return () => unsubscribe();
    }, [])

    return user;
}