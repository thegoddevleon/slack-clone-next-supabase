/* ================================
 *  For Server Side Only Services
 * ================================
 *
 */
import "server-only";

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { User } from "@/types/app";

export const getCurrentUserData = async (): Promise<User | null> => {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};
