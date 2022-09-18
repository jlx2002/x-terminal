/*
 * @Description: b站视频接口
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:32:15
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-17 22:16:42
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 分页获取  b站热门视频
 * @param {number} pageSize
 * @param {number} pageNum
 * @return {*}
 * @author: jlx
 */
export const getHotBiliBiliVideo = async (
  pageSize: number,
  pageNum: number
) => {
  if (pageSize <= 0 || pageNum < 0) {
    return null;
  }
  return await myAxios.post("/bilibili/hot", { ps: pageSize, pn: pageNum });
};

/**
 * @description: 根据视频分区id 获取b站该分区的热门视频
 * @param {number} rid
 * @return {*}
 * @author: jlx
 */
export const getBiliBiliHotVideoByRid = async (rid: number) => {
  if (rid <= 0) {
    return null;
  }
  return await myAxios.post("/bilibili/ranking", { rid: rid });
};
