"use client";

import SidebarNav from "@/components/common/sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { signOutAction } from "@/feats/auth/actions/auth.action";
import { cn } from "@/lib/utils";
import { User, Workspace } from "@/types/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { GiNightSleep } from "react-icons/gi";
import { GoDot, GoDotFill } from "react-icons/go";
import { CircleDashed } from "lucide-react";

type SidebarProps = {
  userWorksapcesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userWorksapcesData,
  currentWorkspaceData,
  userData,
}) => {
  let backgroundColor = "bg-primary-dark";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const signOutHandler = useCallback(async () => {
    setIsSubmitting(true);
    const { success } = await signOutAction();
    if (success) {
      router.push("/");
    }
  }, [router]);

  if (!currentWorkspaceData) return null;

  return (
    <aside
      className={`
      fixed
      top-0
      left-0
      pt-[50px]
      pb-8
      z-30
      flex
      flex-col
      justify-between
      items-center
      h-screen
      w-[53px]
      md:w-[75px]
      pr-[5px]
      bg-[#420d42]
  `}
    >
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspacesData={userWorksapcesData}
      />

      <div className="flex flex-col space-y-3">
        <div
          className={`
          bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300
          hover:scale-110 text-white grid place-content-center rounded-full w-[35px] h-[35px]
          `}
          onClick={() => {
            toast.error("Inviting service is currently not available");
          }}
        >
          <FiPlus size={28} />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="">
                <Popover>
                  <PopoverTrigger>
                    <div className="h-[35px] w-[35px] relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={userData.avatar_url}
                          alt={userData.name || "user"}
                          width={300}
                          height={300}
                        />
                        <div
                          className={cn(
                            "absolute z-10 rounded-full -right-[20%] -bottom-1",
                            backgroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill className="text-green-600" size={17} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right" className="mb-2">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name && userData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Typography variant="p" className="font-bold">
                            {userData.name || userData.email}
                          </Typography>
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size="12" />
                            ) : (
                              <GoDotFill className="text-green-600" size="17" />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-[#1264A3] px-2 py-1 rounded cursor-pointer"
                        >
                          {userData.is_away
                            ? "Set yourself as active"
                            : "Set yourself as away"}
                        </Typography>
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-[#1264A3] px-2 py-1 rounded cursor-pointer"
                        >
                          Clear Status
                        </Typography>
                        <hr className="bg-gray-400" />
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-[#1264A3] px-2 py-1 rounded cursor-pointer"
                        >
                          Profile
                        </Typography>
                        <hr className="bg-gray-400" />
                        <button
                          className="text-left"
                          type="button"
                          onClick={signOutHandler}
                          disabled={isSubmitting}
                        >
                          <Typography
                            variant="p"
                            className="hover:text-white hover:bg-[#1264A3] px-2 py-1 rounded cursor-pointer"
                          >
                            {`Sign out`}
                            {isSubmitting && (
                              <CircleDashed
                                size={14}
                                className="animate-spin inline-block relative ml-1 -top-[1px]"
                              />
                            )}
                          </Typography>
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="text-white bg-black border-black"
              side="right"
            >
              <Typography variant="p">
                {userData.name || userData.email}
              </Typography>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
