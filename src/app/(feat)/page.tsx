import { getCurrentUserData } from "@/feats/auth/services/auth.service";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const userData = await getCurrentUserData();

  if (!userData) return redirect("/auth");

  const userWorkspaceId = userData.workspaces?.[0];

  if (!userWorkspaceId) return redirect("/create-workspace");

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`);

  return null;
};

export default HomePage;
