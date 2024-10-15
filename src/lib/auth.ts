import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./queries/auth-queries";
import { logInSchema } from "./validations/auth-validations";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Runs on login

        // Validation
        const validatedCredentials = logInSchema.safeParse(credentials);
        if (!validatedCredentials.success) return null;

        // Extracts values
        const { email, password } = validatedCredentials.data;

        // Finds user
        const user = await getUserByEmail(email);
        if (!user) return null;

        // Compares passwords
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      // Checks if user is logged in
      return !!auth?.user;
    },
    // Adds user ID to token when user logs in
    jwt: ({ token, user }) => {
      if (user) {
        // On sign in
        token.userId = user.id;
      }

      return token;
    },
    // Adds user ID to the session
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authOptions);
