/**
 * =================================================
 * For Social Login And Email Based Authentication
 * =================================================
 *
 * For Google
 * @description: https://supabase.com/docs/guides/auth/social-login/auth-google
 *
 * For Github
 * @description: https://supabase.com/docs/guides/auth/social-login/auth-github
 *
 */

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  // console.log("\n--------------------------------");
  // console.log("Calling Request inside auth/callback");
  // console.log("--------------------------------\n");
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // For additional OAuth debugging

  // console.log({ code, state });
  // if "next" is in param, use it as the redirect URL
  // const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = supabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}`);
      } else {
        return NextResponse.redirect(`${origin}`);
      }
    }

    console.log(error);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
