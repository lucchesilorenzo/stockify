import AuthFooter from "@/components/auth-footer";
import AuthForm from "@/components/auth-form";
import AuthHeading from "@/components/auth-heading";
import AuthImage from "@/components/auth-image";

export const metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <>
      <AuthImage />

      <div className="flex min-h-screen items-center justify-center">
        <div className="grid w-[350px] gap-6">
          <AuthHeading authType="signup" />
          <AuthForm authType="signup" />
          <AuthFooter authType="signup" />
        </div>
      </div>
    </>
  );
}
