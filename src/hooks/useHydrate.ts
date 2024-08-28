import { useEffect, useState } from "react";

const useHydrate = () => {
  const [hasHydrate, setHasHydrate] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrate(true);
  }, []);

  return { hasHydrate };
};

export default useHydrate;
