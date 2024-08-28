/* ================================
 *  For Server Side Only Services
 * ================================
 *
 */
import "server-only";
import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { generateMetaForPagination } from "@/lib/utils";
import { Message } from "@/types/app";

type getMessageByChannelIdProps = {
  channelId: string;
  page: number;
};

export const getMessageByChannelId = async ({
  channelId,
  page,
}: getMessageByChannelIdProps) => {
  const supabase = supabaseServerClient();

  const LIMIT_COUNT = 5 as const;
  const skip = (page - 1) * LIMIT_COUNT;

  const { count: totalCount, error: countError } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("channel_id", channelId)
    .eq("is_deleted", false);

  if (countError || totalCount === null)
    return {
      data: [] as Message[],
      error: countError?.message || "Cant fetch messages for this channel",
    };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

  // Get the paginated message
  const { data: messages, error: messageError } = await supabase
    .from("messages")
    .select("*, user:user_id(*)")
    .eq("channel_id", channelId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .range(skip, skip + LIMIT_COUNT - 1);

  if (messageError)
    return {
      data: [] as Message[],
      error: messageError?.message || "Cant fetch messages for this channel",
    };

  const meta = generateMetaForPagination({ page, totalPages });

  return {
    data: messages as Message[],
    meta,
    error: null,
  };
};

export const getMessageById = async (messageId: string) => {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", messageId);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};
