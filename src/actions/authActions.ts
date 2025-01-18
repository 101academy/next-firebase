'use server'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuthRef } from "./utils/firebaseUtils";
import { UserInfo } from "@/models/models";
import { decrypt, encrypt } from "./utils/cryptography";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const register = async(email:string, password:string) => {

    // PENDING: VALIDATE INPUTS

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

export async function loginAction(email:string, password:string) {

    // PENDING: VALIDATE INPUTS

    const auth = await getFirebaseAuthRef();
    if (!auth) return null;

    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const userInfo:UserInfo = {
        "id": userCredentials.user.uid,
        "name": userCredentials.user.displayName,
        "email": userCredentials.user.email
    };
    // CREATE SESSION OBJECT
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({userInfo, expires})

    // SET COOKIE
    cookies().set('session', session, {expires, httpOnly: true});
    return userInfo;
}

export async function logoutAction() {
    const auth = await getFirebaseAuthRef();
    if (!auth) return true;
    
    await signOut(auth);
    // REMOVE COOKIE
    cookies().set('session', '', {expires: new Date(0)});
    return true;
}

export async function updateSesion(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;

    const parsedSession = await decrypt(session);
    parsedSession.expires = new Date(Date.now() + 10 * 1000);
    const response = NextResponse.next();
    response.cookies.set({
        name: 'session',
        value: await encrypt (parsedSession),
        httpOnly: true,
        expires: parsedSession.expires
    });
    return response;
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}