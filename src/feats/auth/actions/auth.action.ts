"use server";

import config from "@/config/config";
import { responseError, responseSuccess } from "@/lib/response/response-helper";
import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { AuthLoginFormValues } from "../validations/auth.validation";
import { getCurrentUserData, getUserById } from "../services/auth.service";

export const signInWithEmailAction = async (
  _currentState: unknown,
  authData: AuthLoginFormValues
) => {
  const supabase = supabaseServerClient();

  const response = await supabase.auth.signInWithOtp({
    email: authData.email,
    options: {
      emailRedirectTo: config.defaultUrl,
    },
  });

  if (response.error) {
    return responseError(response.error.message, null);
  }

  return responseSuccess("Successfully signed in.", response.data);
};

export const signOutAction = async () => {
  const supabase = supabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};

export const getCurrentUserAction = async () => {
  return getCurrentUserData();
};

export const getUserAction = async (userId: string) => {
  return getUserById(userId);
};
