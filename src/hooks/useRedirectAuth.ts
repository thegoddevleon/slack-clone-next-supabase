import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useRedirectAuth = () => {
  const router = useRouter();
  const [hasHydrate, setHydrate] = useState(false);

  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();

      if (session) {
        return router.push("/");
      }
    };

    getCurrUser();
    setHydrate(true);
  }, [router]);

  return { hasHydrate };
};

export default useRedirectAuth;
