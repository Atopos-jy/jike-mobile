import { http } from "@/utils";
import type { ApiResponse } from "@/type/api";

export type ChannelItem = {
  id: number;
  name: string;
};

type ChannelRes = {
  channels: ChannelItem[];
};

// 请求频道列表

export function fetchChannelAPI(): Promise<ApiResponse<ChannelRes>> {
  return http.get("/channels");
}

// 请求文章列表

type ListItem = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: {
    type: number;
    images: string[];
  };
};

export type ListRes = {
  results: ListItem[];
  pre_timestamp: string;
};

type ReqParams = {
  channel_id: string;
  timestamp: string;
};
export function fetchListAPI(params: ReqParams): Promise<ApiResponse<ListRes>> {
  return http.get("/channels", params);
}
