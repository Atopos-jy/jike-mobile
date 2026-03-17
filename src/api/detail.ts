import { type ApiResponse } from "@/type/api";
import { http } from "@/utils";
/**
 * 响应数据
 */
export interface DetailDataType {
  /**
   * 文章id
   */
  art_id: string;
  /**
   * 文章内容
   */
  content: string;

  /**
   * 文章发布时间
   */
  pubdate: string;

  /**
   * 文章标题
   */
  title: string;
}

export function fetchDetailAPI(
  id: string,
): Promise<ApiResponse<DetailDataType>> {
  return http.get(`/articles/${id}`);
}
