/* ================================
 *  For Server Side Only Services
 * ================================
 *
 */
import "server-only";

import { Channel } from "@/types/app";
import { supabaseServerClient } from "@/lib/supabase/supabaseServer";

export const getUserWorkspaceChannels = async (
  workspaceId: string,
  userId: string
) => {
  const supabase = await supabaseServerClient();

  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select("channels")
    .eq("id", workspaceId)
    .single();

  if (workspaceError) {
    console.error(workspaceError);
    return [];
  }

  const channelIds = workspaceData.channels;

  if (!channelIds || channelIds.length === 0) {
    console.log("No channels found");
    return [];
  }

  const { data: channelsData, error: channelsError } = await supabase
    .from("channels")
    .select("*")
    .in("id", channelIds);

  if (channelsError) {
    console.error(channelsError);
    return [];
  }

  const userWorkspaceChannels = channelsData.filter((channel) =>
    channel.members.includes(userId)
  );

  return userWorkspaceChannels as Channel[];
};

export const updateUserChannels = async (userId: string, channelId: string) => {
  const supabase = supabaseServerClient();

  // Update the user record
  const { data: updateUserChannelData, error: updateUserChannelError } =
    await supabase.rpc("update_user_channels", {
      user_id: userId,
      channel_id: channelId,
    });

  return [updateUserChannelData, updateUserChannelError];
};

export const updateChannelMembers = async (
  userId: string,
  channelId: string
) => {
  const supabase = supabaseServerClient();

  // Update the user record
  const { data: updateChannelMemberData, error: updateChannelMemberError } =
    await supabase.rpc("update_channel_members", {
      channel_id: channelId,
      new_member: userId,
    });

  return [updateChannelMemberData, updateChannelMemberError];
};

export const getChannelById = async (
  channelId: string
): Promise<Channel | null> => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("channels")
    .select("*")
    .eq("id", channelId);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};
