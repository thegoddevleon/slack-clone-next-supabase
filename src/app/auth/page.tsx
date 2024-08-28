import { Typography } from "@/components/ui/typography";
import { larsseitFont } from "@/lib/fonts/font-helper";
import { getSeoTag } from "@/lib/seo/seo";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./assets/components/login-form";

export const metadata: Metadata = getSeoTag({
  title: "Login",
  description:
    "Log in to Slack, or try for free with your teammates. All it takes is an email address to get started.",
});

const AuthPage = async () => {
  return (
    <section className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[420px]">
        <div className="flex justify-center items-center gap-3 mb-9">
          <Image
            className="w-[102px] h-[25px]"
            alt="Slack Icon"
            src="/slack.svg"
            width={102}
            height={25}
          />
        </div>

        <Typography
          variant="h1"
          className={cn(
            "mb-3 font-bold tracking-normal !text-5xl",
            larsseitFont.className
          )}
        >
          Sign in to Slack
        </Typography>

        <Typography
          variant="p"
          className="opacity-90 mb-8 !text-base !tracking-wide"
        >
          We suggest using the{" "}
          <span className="font-bold"> email address you use at work.</span>
        </Typography>

        <LoginForm />
      </div>
    </section>
  );
};

export default AuthPage;
