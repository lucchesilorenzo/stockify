import Link from "next/link";

type AuthFooterProps = {
  authType: "login" | "signup";
};

export default function AuthFooter({ authType }: AuthFooterProps) {
  return (
    <div className="mt-4 text-center text-sm">
      {authType === "login"
        ? "Don't have an account?"
        : "Already have an account?"}{" "}
      <Link
        href={authType === "login" ? "/signup" : "/login"}
        className="underline"
      >
        {authType === "login" ? "Sign up" : "Login"}
      </Link>
    </div>
  );
}
