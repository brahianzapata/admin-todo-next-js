

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/auth/auth-actions";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
          }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electronico", type: "email", placeholder: "usuario@google.com" },
                password: { label: "Password", type: "password", placeholder: "****" }
            },
            async authorize(credentials, req) {
                const user = await signInEmailPassword(credentials!.email, credentials!.password)
          
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                } 
                
                return null
            }
        })
    ],
    session:{
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials}){
            return true;
        },
        async jwt({ token, account, profile, user }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email'}});

            if( dbUser?.isActive === false ) {
                throw Error('Usuario no esta activo');
            }

            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },
        async session({ token, session, user }) {
            if( session && session.user ) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }

            return session;
        }
    }
}

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST };