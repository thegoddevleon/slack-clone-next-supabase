"use client";

import { Typography } from "@/components/ui/typography";
import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { FiHash, FiHeadphones, FiFileText, FiUserPlus } from "react-icons/fi";

type MessageHeaderType = {
  headerTitle: string;
};

const ActionIcon: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <button
      onClick={() => toast.success("Just showing ui only!")}
      className="h-[28px] px-[10px] border border-[#dfdfdf] hover:bg-[#eee] rounded-[5px] text-[12px] flex justify-center items-center"
    >
      {children}
    </button>
  );
};

const MessageHeader: React.FC<MessageHeaderType> = ({ headerTitle }) => {
  return (
    <section className="h-[49px] border-b sticky top-[0px] bg-white w-full border-[#dfdfdf] flex flex-row justify-between items-center pl-[10px] pr-[12px]">
      <Typography
        variant={"h3"}
        className="!text-base font-bold hover:bg-[#eeeeee] py-[4px] px-[10px] rounded-[5px] cursor-pointer"
      >
        <FiHash
          size={14}
          className="inline-block mr-[2px] relative top-[-2px]"
        />{" "}
        {headerTitle}
      </Typography>
      <div className="flex flex-row gap-x-2">
        <ActionIcon>
          <span>
            <FiUserPlus
              size={14}
              className="inline-block mr-[2px] relative top-[-2px]"
            />{" "}
            <span className="hidden lg:inline-block">Friends</span>
          </span>
        </ActionIcon>

        <ActionIcon>
          <span>
            <FiHeadphones
              size={14}
              className="inline-block mr-[2px] relative top-[-2px]"
            />{" "}
            <span className="hidden lg:inline-block">Huddle</span>
          </span>
        </ActionIcon>

        <ActionIcon>
          <span>
            <FiFileText
              size={14}
              className="inline-block mr-[2px] relative top-[-2px]"
            />{" "}
            <span className="hidden lg:inline-block">Canvas</span>
          </span>
        </ActionIcon>
      </div>
    </section>
  );
};
export default MessageHeader;
