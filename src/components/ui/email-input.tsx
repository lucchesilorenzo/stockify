import { Mail } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  TLogInSchema,
  TSignUpSchema,
} from "@/lib/validations/auth-validations";

type EmailInputProps = {
  id: string;
  placeholder: string;
  register: UseFormRegister<TSignUpSchema & TLogInSchema>;
};

export default function EmailInput({
  id,
  placeholder,
  register,
}: EmailInputProps) {
  return (
    <div className="relative">
      <Input
        id={id}
        className="peer pe-9"
        placeholder={placeholder}
        {...register("email")}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Mail size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
