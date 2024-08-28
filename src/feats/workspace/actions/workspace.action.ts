"use server";

import { getCurrentUserData } from "@/feats/auth/services/auth.service";
import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { Message } from "@/types/app";
import {
  getChannelById,
  updateChannelMembers,
  updateUserChannels,
} from "../services/channel.service";
import {
  addMemberToWorkspace,
  getWorkspaceById,
  getWorkspaceByInviteCode,
  joinWorkspace,
  updateUserWorkspace,
} from "../services/workspace.service";

export const createWorkspace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error, data: workspaceRecord } = await supabase
    .from("workspaces")
    .insert({
      image_url: imageUrl,
      name,
      super_admin: userData.id,
      slug,
      invite_code,
    })
    .select("*");

  if (error) {
    console.log("insert workspace error", error);
    return { error };
  }

  const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(
    userData.id,
    workspaceRecord[0].id
  );

  if (updateWorkspaceError) {
    return { error: updateWorkspaceError };
  }

  //   Add user to workspace members
  const [addMemberToWorkspaceData, addMemberToWorkspaceError] =
    await addMemberToWorkspace(userData.id, workspaceRecord[0].id);

  if (addMemberToWorkspaceError) {
    return { error: addMemberToWorkspaceError };
  }

  return updateWorkspaceData;
};

export const createWorkspaceChannel = async ({
  name,
  workspaceId,
}: {
  name: string;
  workspaceId: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    return { error: "No workspace data" };
  }

  if (workspace.super_admin !== userData.id) {
    return { error: "No authorized to create channel for this workspace" };
  }

  const { error, data: channelRecord } = await supabase
    .from("channels")
    .insert({
      name,
      user_id: userData.id,
      workspace_id: workspaceId,
    })
    .select("*");

  if (error) {
    console.log("insert workspace error", error);
    return { error };
  }

  const [updateUserChannelData, updateUserChannelError] =
    await updateUserChannels(userData.id, channelRecord[0].id);

  if (updateUserChannelError) {
    return { error: updateUserChannelError };
  }

  const [addMemberToChannelData, addMemberToChannelError] =
    await updateChannelMembers(userData.id, channelRecord[0].id);

  if (addMemberToChannelError) {
    return { error: addMemberToChannelError };
  }

  return channelRecord[0];
};

export const createMessageAction = async ({
  workspaceId,
  channelId,
  content,
}: {
  workspaceId: string;
  channelId: string;
  content: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { data: null, error: "No user data" };
  }

  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    return { data: null, error: "No workspace data" };
  }

  const channel = await getChannelById(channelId);
  if (!channel) {
    return { data: null, error: "No channel data" };
  }

  if (channel.workspace_id !== workspace.id) {
    return { data: null, error: "Workspace and channeld id mismatch" };
  }

  const { error, data: channelRecord } = await supabase
    .from("messages")
    .insert({
      name: userData.name,
      user_id: userData.id,
      workspace_id: workspaceId,
      channel_id: channelId,
      content,
    })
    .select("*, user:user_id(*)");

  if (error) {
    console.log("Insert message error", error);
    return { data: null, error: error.message };
  }

  return { error: "", data: channelRecord[0] as Message };
};

export const updatMessageAction = async ({
  workspaceId,
  channelId,
  content,
  messageId,
}: {
  workspaceId: string;
  channelId: string;
  content: string;
  messageId: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { data: null, error: "No user data" };
  }

  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    return { data: null, error: "No workspace data" };
  }

  const channel = await getChannelById(channelId);
  if (!channel) {
    return { data: null, error: "No channel data" };
  }

  if (channel.workspace_id !== workspace.id) {
    return { data: null, error: "Workspace and channeld id mismatch" };
  }

  const { error, data: channelRecord } = await supabase
    .from("messages")
    .update({
      content,
    })
    .eq("id", messageId)
    .select("*, user:user_id(*)");

  if (error) {
    console.log("Update message error", error);
    return { data: null, error: error.message };
  }

  return { error: "", data: channelRecord[0] as Message };
};

export const joinWorkSpaceAction = async ({
  invite_code,
}: {
  invite_code: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { error: "No user data", success: false };
  }

  const workspace = await getWorkspaceByInviteCode(invite_code);

  if (!workspace) {
    return { error: "No workspace Data", success: false };
  }

  const isAlreadyJoin = userData.workspaces?.some((ws) => ws === workspace.id);

  if (isAlreadyJoin) {
    return { error: `Already joined : # ${workspace.name}`, success: false };
  }

  await joinWorkspace({ userId: userData.id, workspaceId: workspace.id });

  return { success: true, error: null, data: workspace };
};
