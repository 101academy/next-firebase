'use server'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuthRef } from "./utils/firebaseUtils";
import { UserInfo } from "@/models/models";

export const register = async(email:string, password:string) => {
    const auth = await getFirebaseAuthRef();
    if (!auth) return false;

    return new Promise((resolve) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                resolve(false);
            });
    });
}

export const login = async(email:string, password:string) => {
    const auth = await getFirebaseAuthRef();
    if (!auth) return false;

    return new Promise<UserInfo | null>((resolve) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                resolve({
                    "id": userCredentials.user.uid,
                    "name": userCredentials.user.displayName,
                    "email": userCredentials.user.email
                });
            })
            .catch(() => {
                resolve(null);
            });
    });
}

export const logout = async() => {
    const auth = await getFirebaseAuthRef();
    if (!auth) return true;
    
    await signOut(auth);
    return true;
}
