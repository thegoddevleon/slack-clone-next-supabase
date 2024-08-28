"use server";

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import {
  getMessageByChannelId,
  getMessageById,
} from "../services/message.service";
import { getCurrentUserData } from "@/feats/auth/services/auth.service";

type getMessageByChannelActionProps = {
  channelId: string;
  page: number;
};

export const getMessageByChannelAction = async (
  props: getMessageByChannelActionProps
) => {
  return getMessageByChannelId(props);
};

export const deleteMessageAction = async ({
  messageId,
}: {
  messageId: string;
}) => {
  const supabase = supabaseServerClient();
  const userData = await getCurrentUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const message = await getMessageById(messageId);
  if (!message) {
    return { error: "No message data" };
  }

  if (message.user_id !== userData.id) {
    return { error: "No authorized to delete for this message" };
  }

  const { error } = await supabase
    .from("messages")
    .update({
      is_deleted: true,
    })
    .eq("id", messageId);

  if (error) {
    return { error: error.message, success: false };
  }

  return { error: "", success: true };
};
