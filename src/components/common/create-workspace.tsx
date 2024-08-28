import { useCreateWorkspace } from "@/app/(feat)/create-workspace/assets/hooks/useCreateWorkspace";
import ImageUpload from "@/components/common/image-upload";
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
import { createWorkspace } from "@/feats/workspace/actions/workspace.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const CreateWorkspace = () => {
  const router = useRouter();
  const { imageUrl, updateImageUrl } = useCreateWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Workspace name should be at least 2 characters long",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    const slug = slugify(name, { lower: true });
    const invite_code = uuidv4();
    setIsSubmitting(true);

    const result = await createWorkspace({ name, slug, invite_code, imageUrl });

    setIsSubmitting(false);

    if (result?.error) {
      console.error(result.error);
    }

    form.reset();
    updateImageUrl("");
    setIsOpen(false);
    router.refresh();
    toast.success("Successfully created Workspace");
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger>
        <div className="flex items-center gap-2 p-2">
          <Button variant="secondary">
            <FaPlus />
          </Button>
          <Typography variant="p">Add Workspace</Typography>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography variant="h4">Create workspace</Typography>
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
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Typography variant="p">
                      This is your workspace name
                    </Typography>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUpload />

            <Button disabled={isSubmitting} type="submit">
              <Typography variant="p">Submit</Typography>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
