"use client";

import { cn } from "@/lib/utils";
import React, { PropsWithChildren, useState } from "react";
import { VscTriangleRight } from "react-icons/vsc";
import ChannelListItem from "./channel-list-item";

const GroupListWrapper: React.FC<
  PropsWithChildren<{ title: string; initialOpen?: boolean }>
> = ({ children, title, initialOpen = false }) => {
  const [isActive, setIsActive] = useState(initialOpen);

  return (
    <>
      <ChannelListItem
        icon={
          <VscTriangleRight
            size={12}
            className={cn(
              "mr-[6px] transition-all ease-in-out",
              isActive && "rotate-90"
            )}
          />
        }
        text={title}
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      />
      {isActive && children}
    </>
  );
};

export default GroupListWrapper;
