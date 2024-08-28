"use client";

import { queryClient } from "@/lib/api/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
