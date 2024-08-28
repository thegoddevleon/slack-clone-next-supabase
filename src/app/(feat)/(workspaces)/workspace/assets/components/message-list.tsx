"use client";

import { useGetMessageByChannelId } from "@/feats/workspace/queries/get-messages-by-channel.query";
import { Channel, Message, User } from "@/types/app";
import { CircleDashed } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import MessageEditor from "./message-editor";
import MessageHeader from "./message-header";
import MessageItem from "./message-item";

type MessageListType = {
  workspaceId: string;
  currentChannel: Channel;
  userData: User;
  channelLoading: boolean;
};

const MessageList: React.FC<MessageListType> = ({
  currentChannel,
  workspaceId,
  userData,
}) => {
  const { ref, inView } = useInView({ threshold: 0, delay: 500 });

  const { data, fetchNextPage, isFetching, hasNextPage } =
    useGetMessageByChannelId({
      channelId: currentChannel.id,
      pageNo: 1,
    });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const messageList = useMemo<Message[]>(() => {
    if (!data?.pages) return [];
    const items = data.pages.reduce((prev, next) => {
      return [...prev, ...next.data];
    }, [] as Message[]);
    return items.reverse();
  }, [data]);

  return (
    <div
      id="message-list-container"
      className="pb-[50px] h-screen w-full overflow-y-auto overflow-x-hidden relative"
    >
      <MessageHeader headerTitle={currentChannel?.name ?? ""} />
      <section className="min-h-[calc(100vh_-_180px)] px-[20px] py-[10px] overflow-y-auto">
        {isFetching ? (
          <div className="ml-2">
            <CircleDashed size={20} className="animate-spin" />
          </div>
        ) : (
          <div ref={ref} className="h-[10px]"></div>
        )}
        {messageList.map((message) => (
          <MessageItem
            key={message.id}
            data={message}
            workspaceId={workspaceId}
            currentUser={userData}
          />
        ))}

        {!isFetching && messageList.length === 0 && (
          <div>
            <h2 className="text-xl font-bold">
              👋 <span className="inline-block mr-1"> </span>Empty messages
            </h2>
            <p className="pl-7">
              Let&apos;s start the first conversation for{" "}
              <span className="font-bold"># {currentChannel?.name}</span>
            </p>
          </div>
        )}
      </section>

      {currentChannel && (
        <MessageEditor
          channelId={currentChannel.id}
          workspaceId={workspaceId}
          type="create"
        />
      )}
    </div>
  );
};
export default MessageList;
