import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./queries/auth-queries";
import { logInSchema } from "./validations/auth-validations";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Run on login

        // Validation
        const validatedCredentials = logInSchema.safeParse(credentials);
        if (!validatedCredentials.success) return null;

        // Extract values
        const { email, password } = validatedCredentials.data;

        // Find user
        const user = await getUserByEmail(email);
        if (!user) return null;

        // Compare passwords
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
    authorized({ auth, request: { nextUrl } }) {
      // Check if user is logged in
      const isLoggedIn = !!auth?.user;
      const isOnPublicPage = ["/", "/app", "/signup", "/login"].includes(
        nextUrl.pathname,
      );
      const isOnAuthPage = ["/signup", "/login"].includes(nextUrl.pathname);

      // Redirect logged in users to dashboard
      if (isLoggedIn && isOnPublicPage) {
        return Response.redirect(new URL("/app/dashboard", nextUrl));
      }

      // Allow unauthenticated users to access auth pages
      if (!isLoggedIn && isOnAuthPage) return true;

      // For other routes, allow access if logged in, deny if not
      return isLoggedIn;
    },
    // Add user ID to token when user logs in
    jwt: ({ token, user }) => {
      if (user) {
        // On sign in
        token.userId = user.id;
      }

      return token;
    },
    // Add user ID to the session
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
