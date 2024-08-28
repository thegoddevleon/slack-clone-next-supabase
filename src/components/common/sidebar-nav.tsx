"use client";

import CreateWorkspace from "@/components/common/create-workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Workspace } from "@/types/app";
import { CircleDashed, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, KeyboardEvent, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiChatsTeardrop } from "react-icons/pi";
import { RiHome2Fill } from "react-icons/ri";
import ProgressBar from "./progress-bar";
import { joinWorkSpaceAction } from "@/feats/workspace/actions/workspace.action";

type SidebarNavProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = ({
  currentWorkspaceData,
  userWorkspacesData,
}) => {
  const router = useRouter();
  const joinEventInputRef = useRef<HTMLInputElement>(null);
  const [switchingWorkspace, setSwitchingWorkspace] = useState(false);
  const [joinWorkspace, setJoinWorkspace] = useState(false);

  let backgroundColor = "bg-primary-dark";

  const switchWorkspace = useCallback(
    (id: string) => {
      setSwitchingWorkspace(true);
      router.push(`/workspace/${id}`);
      setSwitchingWorkspace(true);
    },
    [router]
  );

  const copyInviteLink = useCallback((inviteCode: string) => {
    navigator.clipboard.writeText(`${inviteCode}`);
    toast.success("Invite link copied to clipboard");
  }, []);

  const handleJoinWorkspace = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!joinEventInputRef.current) return;
      const value = joinEventInputRef.current.value;
      if (!value) toast.error("Please enter invite code for workspace");

      setJoinWorkspace(true);
      const { error, success, data } = await joinWorkSpaceAction({
        invite_code: value,
      });
      setJoinWorkspace(false);
      if (error) {
        toast.error(error);
        return;
      }
      if (success && data) {
        switchWorkspace(data.id);
      }
    },
    [switchWorkspace, joinEventInputRef]
  );

  return (
    <nav>
      <ul className="flex flex-col space-y-4 justify-center items-center">
        <li>
          <div className="cursor-pointer items-center t mb-4 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={currentWorkspaceData.image_url || ""}
                    alt={currentWorkspaceData.name}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-[#dfdfdf]">
                    <Typography variant="p">
                      {currentWorkspaceData.name.slice(0, 2)}
                    </Typography>
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0 ml-3" side="bottom">
                <Card className="w-[350px] border-[0.5]">
                  <CardContent className="flex p-0 flex-col">
                    {switchingWorkspace ? (
                      <div className="m-2">
                        <ProgressBar />
                      </div>
                    ) : (
                      userWorkspacesData.map((workspace) => {
                        const isActive =
                          workspace.id === currentWorkspaceData.id;

                        return (
                          <div
                            key={workspace.id}
                            className={cn(
                              isActive && `${backgroundColor}`,
                              "cursor-pointer px-2 py-1 flex gap-2 my-1 hover:bg-[#f2f2f2]"
                            )}
                            onClick={() =>
                              !isActive && switchWorkspace(workspace.id)
                            }
                          >
                            <Avatar>
                              <AvatarImage
                                src={workspace.image_url || ""}
                                alt={workspace.name}
                                className="object-cover w-full h-full"
                              />
                              <AvatarFallback>
                                <Typography variant="p">
                                  {workspace.name.slice(0, 2)}
                                </Typography>
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Typography variant="p" className="text-sm">
                                {workspace.name}
                              </Typography>
                              <div
                                className="flex items-center gap-x-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyInviteLink(workspace.invite_code!);
                                }}
                              >
                                <Typography
                                  variant="p"
                                  className="text-xs lg:text-xs"
                                >
                                  Copy Invite Link
                                </Typography>
                                <Copy size={18} />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}

                    <Separator />

                    <div className="flex items-center p-2 my-2">
                      {joinWorkspace ? (
                        <div className="h-[40px] flex items-center">
                          <CircleDashed className="animate-spin" />
                        </div>
                      ) : (
                        <input
                          placeholder="Type and Press enter to join other workspace"
                          type="text"
                          className="w-full border border-[#dfdfdf] ring-0 px-2 text-sm h-[40px] outline-none rounded-[5px]"
                          onKeyDown={handleJoinWorkspace}
                          ref={joinEventInputRef}
                        />
                      )}
                    </div>

                    <Separator />
                    <CreateWorkspace />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer group text-white"
            onClick={() => toast.success("You are already on home page.")}
          >
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)] w-[35px] h-[35px] flex justify-center items-center">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <Typography variant="p" className="!text-[10px]">
              Home
            </Typography>
          </div>
        </li>
        <li
          onClick={() => {
            toast.success("Currently DM Service is not available");
          }}
        >
          <div className="flex flex-col cursor-pointer items-center group text-white">
            <div className="flex flex-col items-center cursor-pointer group text-white">
              <div className="p-2 rounded-lg w-[35px] h-[35px] flex justify-center items-center">
                <PiChatsTeardrop
                  size={20}
                  className="group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <Typography variant="p" className="!text-[10px]">
                Dms
              </Typography>
            </div>
          </div>
        </li>
        <li
          onClick={() => {
            toast.success("Currently Activity Service is not available");
          }}
        >
          <div className="flex flex-col cursor-pointer items-center group text-white">
            <div className="flex flex-col items-center cursor-pointer group text-white">
              <div className="p-2 rounded-lg w-[35px] h-[35px] flex justify-center items-center">
                <IoNotificationsOutline
                  size={20}
                  className="group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <Typography variant="p" className="!text-[10px]">
                Acivity
              </Typography>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
