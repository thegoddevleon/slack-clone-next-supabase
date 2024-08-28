/* ================================
 *  For Server Side Only Services
 * ================================
 *
 */
import "server-only";

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { Workspace } from "@/types/app";

export const addMemberToWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const supabase = supabaseServerClient();

  //   Update the workspace members
  const { data: addMemberToWorkspaceData, error: addMemberToWorkspaceError } =
    await supabase.rpc("add_member_to_workspace", {
      user_id: userId,
      workspace_id: workspaceId,
    });

  return [addMemberToWorkspaceData, addMemberToWorkspaceError];
};

export const updateUserWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const supabase = supabaseServerClient();

  // Update the user record
  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await supabase.rpc("add_workspace_to_user", {
      user_id: userId,
      new_workspace: workspaceId,
    });

  return [updateWorkspaceData, updateWorkspaceError];
};

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  return [data, error];
};

export const getCurrentWorkspaceData = async (
  workspaceId: string
): Promise<[(Workspace & { members: any[] }) | null, any]> => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*, channels (*)")
    .eq("id", workspaceId)
    .single();

  if (error) {
    return [null, error];
  }

  const { members } = data;

  if (!members) {
    return [data, null];
  }

  const memberDetails = await Promise.all(
    members.map(async (memberId: string) => {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", memberId)
        .single();

      if (userError) {
        console.log(
          `Error fetching user data for member ${memberId}`,
          userError
        );
        return null;
      }

      return userData;
    })
  );

  data.members = memberDetails.filter((member) => member !== null);

  return [data, error];
};

export const getWorkspaceById = async (
  workspaceId: string
): Promise<Workspace | null> => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};

type joinWorkspaceProps = {
  userId: string;
  workspaceId: string;
};
export const joinWorkspace = async ({
  userId,
  workspaceId,
}: joinWorkspaceProps) => {
  const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(
    userId,
    workspaceId
  );

  if (updateWorkspaceError) {
    return { error: "Error update user workspace", success: false };
  }

  const [addMemberToWorkspaceData, addMemberToWorkspaceError] =
    await addMemberToWorkspace(userId, workspaceId);

  if (addMemberToWorkspaceError) {
    return { error: "Error adding member to workspace", success: false };
  }

  return { success: true, error: null };
};

export const getWorkspaceByInviteCode = async (
  inviteCode: string
): Promise<Workspace | null> => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("invite_code", inviteCode);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};
