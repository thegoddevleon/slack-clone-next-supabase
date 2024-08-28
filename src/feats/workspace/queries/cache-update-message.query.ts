import { queryClient } from "@/lib/api/react-query";
import { Message, MessagePaginationResponse } from "@/types/app";
import { InfiniteData } from "@tanstack/react-query";

export const getMessageQueryKeyByChannelId = (channelId: string) => {
  return ["channel_id", channelId];
};

export const updateCacheForNewMessage = (data: Message) => {
  const queryKey = getMessageQueryKeyByChannelId(data.channel_id);
  const keys = [queryKey];

  keys.forEach((key) => {
    const existingCache = queryClient.getQueryData(key);
    if (existingCache) {
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<MessagePaginationResponse, unknown>) => {
          if (oldData.pages[0]?.data) {
            oldData.pages[0].data = [data, ...oldData.pages[0].data];
          }
          return {
            ...oldData,
            pages: oldData.pages,
          };
        }
      );
    }
  });
};

export const updateCacheForRemovingMessage = ({
  messageId,
  channelId,
}: {
  messageId: string;
  channelId: string;
}) => {
  const queryKey = getMessageQueryKeyByChannelId(channelId);
  const keys = [queryKey];

  keys.forEach((key) => {
    const existingCache = queryClient.getQueryData(key);
    if (existingCache) {
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<MessagePaginationResponse, unknown>) => {
          const removingPages = oldData.pages.reduce((prev, page) => {
            page.data = page.data.filter((item) => {
              const condition = item.id !== messageId;
              return condition;
            });

            return [...prev, page];
          }, [] as MessagePaginationResponse[]);
          return {
            ...oldData,
            pages: removingPages,
          };
        }
      );
    }
  });
};

export const updateCacheForUpdatingMessage = (data: Message) => {
  const queryKey = getMessageQueryKeyByChannelId(data.channel_id);
  const keys = [queryKey];

  keys.forEach((key) => {
    const existingCache = queryClient.getQueryData(key);
    if (existingCache) {
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<MessagePaginationResponse, unknown>) => {
          const updatedPages = oldData.pages.reduce((prev, page) => {
            page.data.forEach((item, index) => {
              if (item.id === data.id) {
                page.data[index] = data;
              }
            });
            return [...prev, page];
          }, [] as MessagePaginationResponse[]);

          return {
            ...oldData,
            pages: updatedPages,
          };
        }
      );
    }
  });
};
