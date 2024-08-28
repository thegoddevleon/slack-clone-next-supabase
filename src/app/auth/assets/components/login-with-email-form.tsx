"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { signInWithEmailAction } from "@/feats/auth/actions/auth.action";
import {
  AuthLoginFormValues,
  authLoginSchema,
} from "@/feats/auth/validations/auth.validation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineAutoAwesome } from "react-icons/md";

const LoginWithEmailForm = () => {
  const [loginActionRes, dispatchAction, loading] = useActionState(
    signInWithEmailAction,
    undefined
  );

  const form = useForm<AuthLoginFormValues>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (values: AuthLoginFormValues) => {
      dispatchAction(values);
    },
    [dispatchAction]
  );

  useEffect(() => {
    if (loginActionRes?.success) {
      // console.log({ data: loginActionRes?.data });
      toast.success("Successfully sent to your email!");
    }

    if (!loginActionRes?.success && loginActionRes?.message) {
      toast.error(loginActionRes?.message);
    }
  }, [loginActionRes]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="name@work-email.com"
                    {...field}
                    className="h-11 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className={cn("flex w-full justify-center items-center my-4")}
          >
            {loading ? (
              <>
                <CircleDashed className="animate-spin" />
              </>
            ) : (
              <Typography variant="p">Sign In With Email</Typography>
            )}
          </Button>

          <div className="px-5 py-4 bg-gray-100 rounded-xl">
            <div className="text-gray-500 flex flex-row items-left space-x-3 !rounded-3xl">
              <MdOutlineAutoAwesome className="w-[15px] h-[15px] inline-block self-start top-[4px] relative" />
              <Typography
                variant="p"
                className="flex-1 text-left !text-[15px] !tracking-wide"
              >
                We’ll email you a magic code for a password-free sign in. Or you
                can sign in manually instead.
              </Typography>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default LoginWithEmailForm;
