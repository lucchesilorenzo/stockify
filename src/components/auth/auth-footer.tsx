import Link from "next/link";

import { AUTH_FOOTER_TEXTS } from "@/lib/constants";

type AuthFooterProps = {
  authType: "signup" | "login";
};

export default function AuthFooter({ authType }: AuthFooterProps) {
  return (
    <div className="mt-4 text-center text-sm">
      {AUTH_FOOTER_TEXTS[authType].title}{" "}
      <Link href={AUTH_FOOTER_TEXTS[authType].href} className="underline">
        {AUTH_FOOTER_TEXTS[authType].hrefText}
      </Link>
    </div>
  );
}
