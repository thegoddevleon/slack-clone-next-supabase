"use client";

import ImageUpload from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { createWorkspace } from "@/feats/workspace/actions/workspace.action";
import { CircleDashed } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { useCreateWorkspace } from "../hooks/useCreateWorkspace";

const CreateWorkspace = () => {
  const { currStep } = useCreateWorkspace();

  let stepInView = null;
  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
  }

  return (
    <div className="w-screen h-screen grid place-content-center ">
      <div className="p-3 w-full md:min-w-[550px] max-w-[550px]">
        <div className="flex flex-col gap-x-[10px]">
          <Image
            className="w-[102px] h-[25px] mb-4"
            alt="Slack Icon"
            src="/slack.svg"
            width={102}
            height={25}
          />
          <Typography variant="p" className="text-neutral-400">
            step {currStep} of 2
          </Typography>
        </div>

        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkspace;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspace();

  return (
    <>
      <Typography className="my-4">
        What is the name of your company or team
      </Typography>

      <Typography className="text-neutral-400" variant="p">
        This will be the name of your Slack workspace - choose something that
        your team will recognize.
      </Typography>

      <form className="mt-6">
        <fieldset>
          <Input
            className=""
            type="text"
            value={name}
            placeholder="Enter your company name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />
          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
            disabled={!name}
          >
            <Typography variant="p">Next</Typography>
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { setCurrStep, updateImageUrl, imageUrl, name } = useCreateWorkspace();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const slug = slugify(name);
    const invite_code = uuid();
    const error = await createWorkspace({ imageUrl, name, slug, invite_code });
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);
      return toast.error("Couldn't create workspace. Please try again.");
    }
    toast.success("Successfully created Workspace ");
    router.push("/");
  };

  return (
    <>
      <Button
        size="sm"
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => setCurrStep(1)}
      >
        <Typography variant="p">Back</Typography>
      </Button>

      <form>
        <Typography className="my-4">Add workspace avatar</Typography>
        <Typography className="text-neutral-300" variant="p">
          This image can be changed later in your workspace settings.
        </Typography>

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />
          <div className="space-x-5 flex justify-center">
            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size="sm"
                variant="destructive"
              >
                {isSubmitting && (
                  <CircleDashed
                    size={16}
                    className="animate-spin inline-block mr-1"
                  />
                )}
                <Typography variant="p">Submit</Typography>
              </Button>
            ) : (
              <Button
                size="sm"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  updateImageUrl("");
                  handleSubmit();
                }}
              >
                {isSubmitting && (
                  <CircleDashed
                    size={16}
                    className="animate-spin inline-block mr-1"
                  />
                )}
                <Typography variant="p">Skip for now</Typography>
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};
