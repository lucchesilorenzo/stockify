import Link from "next/link";

type AuthFooterProps = {
  type: "login" | "signup";
};

export default function AuthFooter({ type }: AuthFooterProps) {
  return (
    <div className="mt-4 text-center text-sm">
      {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
      <Link
        href={type === "login" ? "/signup" : "/login"}
        className="underline"
      >
        {type === "login" ? "Sign up" : "Login"}
      </Link>
    </div>
  );
}
