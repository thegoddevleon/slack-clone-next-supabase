import Sidebar from "@/components/common/side-bar";
import TopNav from "@/components/common/top-nav";
import { getCurrentUserData } from "@/feats/auth/services/auth.service";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/feats/workspace/services/workspace.service";
import { Workspace as WorkspaceType } from "@/types/app";
import { notFound, redirect } from "next/navigation";
import Workspace from "../assets/components/workspace";

const WorkspaceIdPage = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getCurrentUserData();
  if (!userData) return redirect("/auth");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  if (!currentWorkspaceData) notFound();

  if (
    userData.workspaces &&
    !userData.workspaces.some((workspace) => {
      return workspace === currentWorkspaceData.id;
    })
  ) {
    return notFound();
  }

  return (
    <section>
      <Sidebar
        currentWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorksapcesData={userWorkspaceData as WorkspaceType[]}
      />
      <TopNav />
      <Workspace
        userData={userData}
        workspaceName={currentWorkspaceData.name}
        workspaceId={workspaceId}
        workspaceOwnerId={currentWorkspaceData.super_admin}
      />
    </section>
  );
};
export default WorkspaceIdPage;
