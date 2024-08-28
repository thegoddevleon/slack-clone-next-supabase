"use client";

import { Typography } from "@/components/ui/typography";
import dateUtil from "@/lib/date/date-util";
import { Message, User } from "@/types/app";
import parse from "html-react-parser";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiEdit, FiX } from "react-icons/fi";
import MessageDelete from "./message-delete";
import MessageEditor from "./message-editor";

type MessageItemProps = {
  data: Message;
  workspaceId: string;
  currentUser: User;
};
function MessageItem({ data, workspaceId, currentUser }: MessageItemProps) {
  const { user: userData } = data;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isOwner = useMemo(() => {
    return currentUser?.id === data.user_id;
  }, [data, currentUser?.id]);

  return (
    <section className="pl-[50px] pt-[7px] pb-[10px] relative min-h-[38px] hover:bg-[#f4f4f4] rounded-[5px] group">
      {userData && (
        <div className="h-[35px] w-[35px] cursor-pointer absolute top-3 left-1">
          <div className="h-full w-full rounded-lg overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={userData.avatar_url}
              alt={userData.name || "user"}
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
      <div>
        {isEditing ? (
          <MessageEditor
            channelId={data.channel_id}
            workspaceId={workspaceId}
            initialContent={data.content ?? ""}
            messageId={data.id}
            onUpdateSuccess={() => setIsEditing(false)}
            type={"edit"}
          />
        ) : (
          <NormalMode
            userName={userData?.name ?? ""}
            time={data.created_at ?? ""}
            content={data.content ?? ""}
          />
        )}
      </div>

      {isOwner && !isEditing && (
        <div className="absolute -top-2 right-[14px] flex-row gap-x-[4px] hidden group-hover:flex ">
          <button
            type="button"
            className="h-[30px] w-[30px] rounded-[5px] cursor-pointer bg-white opacity-70 hover:opacity-100 border border-[#dfdfdf] text-purple-800 flex justify-center items-center"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit />
          </button>
          <MessageDelete messageId={data.id} channelId={data.channel_id} />
        </div>
      )}

      {isOwner && isEditing && (
        <div className="absolute -top-2 right-[14px] flex-row gap-x-[4px] hidden group-hover:flex z-50">
          <button
            type="button"
            className="h-[30px] w-[30px] rounded-[5px] cursor-pointer bg-white opacity-70 hover:opacity-100 border border-[#dfdfdf] text-rose-500 flex justify-center items-center"
            onClick={() => setIsEditing(false)}
          >
            <FiX />
          </button>
        </div>
      )}
    </section>
  );
}

const NormalMode = ({
  userName,
  time,
  content,
}: {
  userName: string;
  time: string;
  content: string;
}) => {
  return (
    <div>
      <div>
        <Typography variant={"h5"} className="!text-base font-bold">
          {userName}{" "}
          <span className="ml-1 inline-block text-sm font-normal text-[#9f9f9f]">
            {dateUtil(time).fromNow()}
          </span>
        </Typography>
      </div>
      <div>{parse(content)}</div>
    </div>
  );
};
export default MessageItem;
