"use client";

import { User } from "@/types/app";
import useChannelList from "../hooks/useChannelList";
import ChannelList from "./channel-list";
import MessageList from "./message-list";
import useMessageListener from "../hooks/useMessageListener";
import MessageHeader from "./message-header";
type WorkspaceProps = {
  workspaceName: string;
  workspaceId: string;
  workspaceOwnerId: string;
  userData: User;
};

const defaultClass =
  "fixed top-[40px] left-[49px] md:left-[70px] pt-[8px] pb-8 pl-[15px] pr-[10px] z-30 flex flex-col h-[calc(100vh_-_40px)] w-[200px] md:w-[320px] bg-[#5e2d60] rounded-tl-[5px] text-white";

function Workspace({
  workspaceName,
  workspaceId,
  userData,
  workspaceOwnerId,
}: WorkspaceProps) {
  const { currentChannel, channelList, onSelectChannel, channelLoading } =
    useChannelList({
      workspaceId,
    });

  const {} = useMessageListener({ currentUser: userData });

  return (
    <>
      <section className={defaultClass}>
        <ChannelList
          workspaceId={workspaceId}
          workspaceOwnerId={workspaceOwnerId}
          workspaceName={workspaceName}
          userData={userData}
          currentChannel={currentChannel}
          channelList={channelList}
          channelLoading={channelLoading}
          onSelectChannel={onSelectChannel}
        />
      </section>
      <section>
        {currentChannel && (
          <MessageList
            userData={userData}
            currentChannel={currentChannel}
            workspaceId={workspaceId}
            channelLoading={channelLoading}
          />
        )}
        {!channelLoading && channelList.length === 0 && (
          <>
            <MessageHeader
              headerTitle={"Empty Channel.. Let's create the first channel"}
            />
          </>
        )}
      </section>
    </>
  );
}
export default Workspace;
