import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";
import { Channel } from "@/types/app";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const supabase = supabaseBrowserClient;

const useChannelList = ({ workspaceId }: { workspaceId: string }) => {
  const [channelLoading, setChannelLoading] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  const fetchChannels = useCallback(async () => {
    try {
      setChannelLoading(true);
      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .eq("workspace_id", workspaceId);

      if (error) {
        throw new Error(error.message);
      }

      setChannelList(data);

      if (data?.[0]) {
        setCurrentChannel(data?.[0]);
      }

      return data as Channel[];
    } catch (error) {
      console.log("error", error);
      toast.error((error as Error).message);
    } finally {
      setChannelLoading(false);
    }
  }, [workspaceId]);

  const onSelectChannel = useCallback((channel: Channel) => {
    setCurrentChannel(channel);
  }, []);

  useEffect(() => {
    fetchChannels();
    const channelListener = supabase
      .channel("realtime:public:channels")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "channels" },
        (payload) => {
          const newChannel = payload.new as Channel;
          if (workspaceId === newChannel.workspace_id) {
            setChannelList((prev) => [...prev, newChannel]);
          }
          console.log("New row added:", payload);
        }
      )
      .subscribe();

    return () => {
      channelListener.unsubscribe();
    };
  }, [fetchChannels, workspaceId]);

  return {
    channelLoading,
    currentChannel,
    channelList,
    onSelectChannel,
  };
};

export default useChannelList;
