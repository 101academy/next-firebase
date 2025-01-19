import Credentials from "next-auth/providers/credentials"
import { loginAction } from "./authActions"
import { signInSchema } from "./utils/zod"
import { JWT } from "next-auth/jwt"
import NextAuth, { User } from "next-auth"
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const { email, password } = await signInSchema.parseAsync(credentials)
 
        user = await loginAction(email, password);
 
        if (!user) {
          throw new Error("Invalid credentials.")
        }
 
        return user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }:{ 
      token: JWT,
      user?: User, 
      trigger?: string }) => {
      if (trigger === 'signIn' && user) {
        token.userInfo = {
          "id": user.id!,
          "email": user.email!,
          "name": user.name!
        };
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession, token: JWT }) {
      if (token && token.userInfo) {
        session.user = token.userInfo
      }
      return session
    }
  }
})