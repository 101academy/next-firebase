'use server'

import { jwtVerify, SignJWT } from "jose";

const secretKey:string = process.env.ENCRYPTION_SECRET ? process.env.ENCRYPTION_SECRET : '';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload:any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('10 seconds from now')
        .sign(key);
}

export async function decrypt(input:string): Promise<any> {
    const {payload} = await jwtVerify(input, key, { algorithms: ['HS256']});
    return payload;
}