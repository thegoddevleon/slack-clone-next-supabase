/**
 * =================================================
 * For Magic Link by Email Based Authentication
 * =================================================
 *
 * For Magic Link with email
 * @description: https://supabase.com/docs/guides/auth/auth-email-passwordless#with-magic-link
 * 
 * For Passwordbased
 * @description: https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=pkce
 */

import { supabaseServerClient } from '@/lib/supabase/supabaseServer';
import { type EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = supabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with instructions
  redirectTo.pathname = '/auth/auth-code-error';
  return NextResponse.redirect(redirectTo);
}