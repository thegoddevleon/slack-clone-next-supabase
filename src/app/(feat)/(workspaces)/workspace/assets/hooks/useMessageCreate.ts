import { createMessageAction } from "@/feats/workspace/actions/workspace.action";
import { updateCacheForNewMessage } from "@/feats/workspace/queries/cache-update-message.query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useMessageCreate = ({
  workspaceId,
  channelId,
}: {
  workspaceId: string;
  channelId: string;
}) => {
  const [submitting, setIsSubmitting] = useState(false);

  const addMessage = useCallback(
    async (content: string) => {
      setIsSubmitting(true);
      const result = await createMessageAction({
        content: content,
        channelId,
        workspaceId,
      });
      setIsSubmitting(false);

      if (result?.error as string) {
        toast.error(result?.error);
        return;
      }

      toast.success("Successfully created message");

      if (result.data) {
        updateCacheForNewMessage(result.data);
      }
      return result;
    },
    [channelId, workspaceId]
  );

  return {
    submitting,
    addMessage,
  };
};

export default useMessageCreate;
