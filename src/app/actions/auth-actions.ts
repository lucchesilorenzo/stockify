"use server";

import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn, signOut } from "@/lib/auth";
import { createUser } from "@/lib/queries/auth-queries";
import { logInSchema, signUpSchema } from "@/lib/validations/auth-validations";

export async function signUpAction(credentials: unknown) {
  // Validation
  const validatedCredentials = signUpSchema.safeParse(credentials);
  if (!validatedCredentials.success) {
    return { message: "Invalid form data." };
  }

  const { firstName, lastName, email, password } = validatedCredentials.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user object
  const user = {
    firstName,
    lastName,
    email,
    hashedPassword,
  };

  // Create user in the database
  try {
    await createUser(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "User already exists." };
      }
    }
    return { message: "Failed to create user." };
  }

  await signIn("credentials", { email, password, redirect: false });

  redirect("/app/dashboard");
}

export async function logInAction(credentials: unknown) {
  // Validation
  const validatedCredentials = logInSchema.safeParse(credentials);
  if (!validatedCredentials.success) {
    return { message: "Invalid form data." };
  }

  // Login
  try {
    await signIn("credentials", {
      ...validatedCredentials.data,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { message: "Invalid email or password." };
      }
    }
    return { message: "Failed to log in." };
  }

  redirect("/app/dashboard");
}

export async function logOutAction() {
  await signOut({ redirectTo: "/login" });
}
