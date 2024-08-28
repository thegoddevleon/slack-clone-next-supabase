"use client";

import { cn } from "@/lib/utils";
import { User } from "@/types/app";
import Image from "next/image";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { GoDot, GoDotFill } from "react-icons/go";
import ChannelListItem from "./channel-list-item";
import GroupListWrapper from "./group-list-wrapper";

const DirectMessageList: React.FC<{ userData: User }> = ({ userData }) => {
  const justShowingUi = useCallback(() => {
    toast.success("Just showing ui only");
  }, []);

  return (
    <section className="">
      <GroupListWrapper title="Direct Messages" initialOpen>
        <ChannelListItem
          icon={
            <div className="h-[20px] w-[20px] relative cursor-pointer">
              <div className="h-full w-full rounded-[5px] overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={userData.avatar_url}
                  alt={userData.name || "user"}
                  width={300}
                  height={300}
                />
                <div
                  className={cn(
                    "absolute z-10 rounded-full -right-[7px] -bottom-1"
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
          }
          text={userData.name || "DM to myself"}
          onClick={justShowingUi}
        />
      </GroupListWrapper>
    </section>
  );
};

export default DirectMessageList;
