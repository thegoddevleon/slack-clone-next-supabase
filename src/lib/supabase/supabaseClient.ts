import config from "@/config/config";
import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowserClient = createBrowserClient(
  config.supabaseURL,
  config.supabaseAnonKey
);
