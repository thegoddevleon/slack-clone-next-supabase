"use client";

import CreateChannel from "@/components/common/create-channel";
import { Typography } from "@/components/ui/typography";
import { Channel, User } from "@/types/app";
import { CircleDashed } from "lucide-react";
import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { FiFastForward, FiFilter, FiHash } from "react-icons/fi";
import ChannelListItem from "./channel-list-item";
import DirectMessageList from "./direct-message-list";
import GetStartedList from "./getstarted-list";
import GroupListWrapper from "./group-list-wrapper";

type ChannelListProps = {
  channelLoading: boolean;
  workspaceId: string;
  workspaceName: string;
  workspaceOwnerId: string;
  userData: User;
  currentChannel: Channel | null;
  channelList: Channel[];
  onSelectChannel: (channel: Channel) => void;
};

const WorkSpaceIcon: React.FC<PropsWithChildren<{ onClick: () => void }>> = ({
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[35px] h-[35px] flex justify-center items-center hover:bg-white/10 rounded-[5px] cursor-ponter"
    >
      {children}
    </button>
  );
};

const ChannelList: React.FC<ChannelListProps> = ({
  channelLoading,
  workspaceId,
  workspaceName,
  workspaceOwnerId,
  userData,
  channelList,
  currentChannel,
  onSelectChannel,
}) => {
  return (
    <section>
      {/* Workspace Name */}
      <div className="flex flex-row justify-between items-center">
        <Typography className="" variant={"h5"}>
          {workspaceName}
        </Typography>
        <div className="flex flex-row gap-x-[1px]">
          <WorkSpaceIcon onClick={() => toast.success("Just showing ui only")}>
            <FiFilter size={16} />
          </WorkSpaceIcon>
          <WorkSpaceIcon onClick={() => toast.success("Just showing ui only")}>
            <FiFastForward size={16} />
          </WorkSpaceIcon>
        </div>
      </div>

      <GetStartedList />

      <section className="mt-5 mb-3">
        <GroupListWrapper title="Channels" initialOpen={true}>
          {channelLoading && (
            <div className="h-[30px] flex justify-center items-center bg-white/20 rounded-[5px]">
              <CircleDashed size={18} className="animate-spin" />
            </div>
          )}
          {channelList.map((channel) => (
            <ChannelListItem
              key={channel.id}
              icon={<FiHash size={16} className="mr-[4px]" />}
              text={channel.name}
              onClick={() => onSelectChannel(channel)}
              isActive={currentChannel?.id === channel.id}
            />
          ))}
          {workspaceOwnerId === userData.id && (
            <CreateChannel workspaceId={workspaceId} />
          )}
        </GroupListWrapper>
      </section>

      <DirectMessageList userData={userData} />
    </section>
  );
};
export default ChannelList;
