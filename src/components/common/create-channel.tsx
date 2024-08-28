import ChannelListItem from "@/app/(feat)/(workspaces)/workspace/assets/components/channel-list-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { createWorkspaceChannel } from "@/feats/workspace/actions/workspace.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { z } from "zod";

const CreateChannel = ({ workspaceId }: { workspaceId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Channel name should be at least 2 characters long",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await createWorkspaceChannel({ name, workspaceId });
    setIsSubmitting(false);

    if (result?.error as string) {
      toast.error(result?.error);
      return;
    }

    form.reset();
    setIsOpen(false);
    toast.success("Successfully created Channel");
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger className="w-full">
        <ChannelListItem
          asChild
          icon={
            <span className="w-[20px] h-[20px] bg-white/10 flex justify-center items-center rounded-[5px] relative left-[-2px]">
              <FaPlus size={12} className="" />
            </span>
          }
          text={"Add Channel"}
          onClick={() => {}}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4" asChild>
            <Typography variant="h4">Create Channel</Typography>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="p">Name</Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your channel name" {...field} />
                  </FormControl>
                  <FormDescription>This is your channel name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              <Typography variant="p">Submit</Typography>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
