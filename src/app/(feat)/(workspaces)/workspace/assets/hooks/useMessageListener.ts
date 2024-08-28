import {
  getCurrentUserAction,
  getUserAction,
} from "@/feats/auth/actions/auth.action";
import {
  updateCacheForNewMessage,
  updateCacheForRemovingMessage,
  updateCacheForUpdatingMessage,
} from "@/feats/workspace/queries/cache-update-message.query";
import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";
import { Message, User } from "@/types/app";
import { useEffect } from "react";

const supabase = supabaseBrowserClient;

const useMessageListener = ({ currentUser }: { currentUser: User }) => {
  useEffect(() => {
    const messageCreateListener = supabase
      .channel("realtime:public:createMessage")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMessage = payload.new as Message;
          if (currentUser.id === newMessage.user_id) return;

          const user = await getUserAction(newMessage.user_id);

          if (user && newMessage) {
            newMessage.user = user;
            updateCacheForNewMessage(newMessage);
          }
        }
      )
      .subscribe();

    const mesageUpdateListener = supabase
      .channel("realtime:public:updateMessage")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        async (payload) => {
          const updatedMessage = payload.new as Message;
          if (currentUser.id === updatedMessage.user_id) return;

          if (updatedMessage.is_deleted) {
            updateCacheForRemovingMessage({
              messageId: updatedMessage.id,
              channelId: updatedMessage.channel_id,
            });
            return;
          }

          const user = await getUserAction(updatedMessage.user_id);

          if (user && updatedMessage) {
            updatedMessage.user = user;
            updateCacheForUpdatingMessage(updatedMessage);
          }
        }
      )
      .subscribe();

    return () => {
      messageCreateListener.unsubscribe();
      mesageUpdateListener.unsubscribe();
    };
  }, [currentUser]);
  return {};
};

export default useMessageListener;
