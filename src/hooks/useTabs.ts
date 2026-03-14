import { useEffect, useState } from "react";
import { type ChannelItem, fetchChannelAPI } from "@/api/list";

function useTabs() {
  const [channels, setChannels] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI();
        setChannels(res.data.channels);
      } catch (error) {
        throw new Error("fetch channel error");
      }
    };
    getChannels();
  }, []);

  return {
    channels,
  };
}

export { useTabs };
