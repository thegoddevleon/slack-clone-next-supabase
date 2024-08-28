"use client";

import { Typography } from "@/components/ui/typography";
import LoginWithEmailForm from "./login-with-email-form";
import LoginWithSocialAuth from "./login-with-social-auth";
import useRedirectAuth from "@/hooks/useRedirectAuth";
import { CircleDashed } from "lucide-react";

function LoginForm() {
  const { hasHydrate } = useRedirectAuth();
  if (!hasHydrate) {
    return (
      <section className="flex flex-row justify-center items-center min-h-[368px]">
        <CircleDashed className="animate-spin" />
      </section>
    );
  }

  return (
    <section>
      <LoginWithSocialAuth />
      <div>
        <div className="flex items-center my-6">
          <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
          <Typography variant="p">OR</Typography>
          <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
        </div>
        <LoginWithEmailForm />
      </div>
    </section>
  );
}

export default LoginForm;
