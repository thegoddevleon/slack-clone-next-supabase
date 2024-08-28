"use client";

import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { FiMessageCircle, FiSend, FiSmile } from "react-icons/fi";
import ChannelListItem from "./channel-list-item";

const GetStartedList: React.FC = () => {
  const justShowingUi = useCallback(() => {
    toast.success("Just showing ui only");
  }, []);

  return (
    <section className="mt-5">
      <ChannelListItem
        icon={<FiSmile size={18} />}
        text={"Get Started"}
        onClick={justShowingUi}
      />
      <ChannelListItem
        icon={<FiMessageCircle size={18} />}
        text={"Thread"}
        onClick={justShowingUi}
      />
      <ChannelListItem
        icon={<FiSend size={18} />}
        text={"Draft & Send"}
        onClick={justShowingUi}
      />
    </section>
  );
};

export default GetStartedList;
