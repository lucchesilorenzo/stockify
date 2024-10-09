type AuthHeadingProps = {
  authType: "login" | "signup";
};

export default function AuthHeading({ authType }: AuthHeadingProps) {
  return (
    <div className="grid gap-2 text-center">
      <h1 className="text-3xl font-bold">
        {authType === "signup" ? "Sign up" : "Login"}
      </h1>
      <p className="text-balance text-muted-foreground">
        Enter your email below to {authType === "signup" ? "sign up" : "log in"}{" "}
        to your account
      </p>
    </div>
  );
}
