import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { deleteMessageAction } from "@/feats/workspace/actions/message.action";
import { updateCacheForRemovingMessage } from "@/feats/workspace/queries/cache-update-message.query";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { CircleDashed } from "lucide-react";

const MessageDelete = ({
  messageId,
  channelId,
}: {
  messageId: string;
  channelId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteMessage = useCallback(async () => {
    setIsSubmitting(true);
    const result = await deleteMessageAction({ messageId });
    setIsSubmitting(false);

    if (result?.error as string) {
      toast.error(result?.error);
      return;
    }

    if (result.success) {
      updateCacheForRemovingMessage({ messageId, channelId });
    }

    setIsOpen(false);
    toast.success("Successfully deleted");
  }, [channelId, messageId]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger>
        <span className="h-[30px] w-[30px] rounded-[5px] cursor-pointer bg-white opacity-70 hover:opacity-100 border border-[#dfdfdf] text-rose-500 flex justify-center items-center">
          <FiTrash2 />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4" asChild>
            <Typography variant="h4">
              Confirm to Delete This Mesage ?
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-x-3">
          <DialogClose>
            <Button
              asChild
              disabled={isSubmitting}
              type="button"
              variant={"outline"}
            >
              <Typography variant="p">Cancel</Typography>
            </Button>
          </DialogClose>
          <Button
            disabled={isSubmitting}
            type="button"
            onClick={onDeleteMessage}
          >
            <Typography variant="p">
              Delete
              {isSubmitting && (
                <CircleDashed
                  size={14}
                  className="animate-spin inline-block relative ml-1 -top-[2px]"
                />
              )}
            </Typography>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDelete;
