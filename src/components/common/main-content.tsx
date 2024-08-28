"use client";

import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main
      className={cn(
        "h-screen overflow-y-hidden pt-[40px] pl-[240px] md:pl-[390px]"
      )}
    >
      {children}
    </main>
  );
};

export default MainContent;
