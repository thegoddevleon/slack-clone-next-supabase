import { generateMetaForPagination } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessageByChannelAction } from "../actions/message.action";
import { getMessageQueryKeyByChannelId } from "./cache-update-message.query";
import { Message } from "@/types/app";

type GetMessageByChannelProps = {
  pageNo: number;
  channelId?: string;
};

const getMessageByChannelFn = async ({
  pageNo = 1,
  channelId,
}: GetMessageByChannelProps) => {
  const defaultData = {
    data: [] as Message[],
    meta: generateMetaForPagination({ page: 1, totalPages: 0 }),
  };

  const response = await getMessageByChannelAction({
    page: pageNo,
    channelId: channelId ?? "",
  });

  if (response.data && response.meta) {
    return response;
  }

  return defaultData;
};

export const useGetMessageByChannelId = ({
  pageNo,
  channelId,
}: GetMessageByChannelProps) => {
  // Using useInfiniteQuery to handle paginated queries
  return useInfiniteQuery({
    structuralSharing: (oldData, newData) =>
      oldData === newData ? oldData : newData,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    queryKey: getMessageQueryKeyByChannelId(channelId || ""),
    queryFn: ({ pageParam = 0 }) =>
      getMessageByChannelFn({
        pageNo: pageParam as number,
        channelId,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasNextPage
        ? lastPage.meta.currentPage + 1
        : undefined;
    },
    enabled: !!channelId,
  });
};
