"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { Provider } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";

function LoginWithSocialAuth() {
  const [loading, isLoading] = useState(false);

  const loginWithSocialAuth = useCallback(async (provider: Provider) => {
    isLoading(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    isLoading(false);
  }, []);

  return (
    <div className="flex flex-col space-y-4 justify-center">
      <Button
        disabled={loading}
        size="lg"
        variant="outline"
        className="border-2 flex space-x-3"
        onClick={() => loginWithSocialAuth("google")}
      >
        <FcGoogle size={20} />
        <Typography className="text-lg lg:text-lg" variant="p">
          Sign In With Google
        </Typography>
      </Button>
      <Button
        disabled={loading}
        size="lg"
        variant="outline"
        className="border-2 flex space-x-3"
        onClick={() => loginWithSocialAuth("github")}
      >
        <RxGithubLogo size={20} />
        <Typography className="text-lg lg:text-lg" variant="p">
          Sign In With Github
        </Typography>
      </Button>
    </div>
  );
}
export default LoginWithSocialAuth;
