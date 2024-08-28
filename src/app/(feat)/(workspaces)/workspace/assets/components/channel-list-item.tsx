"use client";

import { cn } from "@/lib/utils";

type ChannelListItemProps = {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick: () => void;
  asChild?: boolean;
};

function ChannelListItem({
  text,
  icon,
  onClick,
  isActive = false,
  asChild = false,
}: ChannelListItemProps) {
  const Slot = asChild ? "span" : "button";

  return (
    <Slot
      type="button"
      onClick={onClick}
      className={cn(
        "pl-[8px] pr-[20px] py-[5px] ",
        "w-full text-left rounded-[5px]",
        "flex items-center gap-x-[5px] ",
        isActive
          ? "bg-white/90 text-[#010101]"
          : "hover:bg-white/10 text-[#ccc] hover:text-white"
      )}
    >
      {icon}
      <p className="pl-[2px] text-sm font-normal">{text}</p>
    </Slot>
  );
}
export default ChannelListItem;
