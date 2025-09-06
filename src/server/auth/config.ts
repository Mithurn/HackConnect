import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow SRMIST college emails
      // Temporarily disabled for testing - uncomment to restrict to SRMIST emails
      // if (!user.email?.endsWith("@srmist.edu.in")) {
      //   return false;
      // }
      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
