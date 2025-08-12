import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        // find user in db
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user) {
          const isPasswordMatch = bcrypt.compareSync(
            credentials.password as string,
            user.password as string
          );

          if (isPasswordMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image,
            };
          }
        }

        // if user doesn't exist or password is not matched
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    async session({ session, token, user, trigger }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    // eslint-disable-next-line
    async jwt({ session, user, token, trigger }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // handle session update
      if (session?.user?.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/sign-in",
    error: "sign-in",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(config);
