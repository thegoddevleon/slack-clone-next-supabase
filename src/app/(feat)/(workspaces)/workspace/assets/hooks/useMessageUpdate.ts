import {
  createMessageAction,
  updatMessageAction,
} from "@/feats/workspace/actions/workspace.action";
import {
  updateCacheForNewMessage,
  updateCacheForUpdatingMessage,
} from "@/feats/workspace/queries/cache-update-message.query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useMessageUpdate = ({
  workspaceId,
  channelId,
  messageId,
  onUpdateSuccess,
}: {
  workspaceId: string;
  channelId: string;
  messageId?: string;
  onUpdateSuccess?: () => void;
}) => {
  const [submitting, setIsSubmitting] = useState(false);

  const updateMessage = useCallback(
    async (content: string) => {
      if (!messageId) {
        toast.error("Message id is required");
        return;
      }
      setIsSubmitting(true);
      const result = await updatMessageAction({
        content: content,
        channelId,
        workspaceId,
        messageId,
      });
      setIsSubmitting(false);

      if (result?.error as string) {
        toast.error(result?.error);
        return;
      }

      toast.success("Successfully updated message");

      if (result.data) {
        updateCacheForUpdatingMessage(result.data);
        onUpdateSuccess?.();
      }
      return result;
    },
    [channelId, workspaceId, onUpdateSuccess, messageId]
  );

  return {
    submitting,
    updateMessage,
  };
};

export default useMessageUpdate;
