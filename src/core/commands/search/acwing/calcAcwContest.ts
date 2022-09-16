/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 20:45:45
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 21:53:23
 */
import dayjs from "@/plugins/myDayjs";
import myAxios from "@/plugins/myAxios";
// 起始时间
let weeklyStart = dayjs("2022-09-12T00:00:00.000Z");
// 开始的周赛
let startWeek = 69;

/**
 * @description: 计算周赛第几场
 * @return {*}
 * @author: jlx
 */
const calcWeekly = () => {
  let now = dayjs(Date.now());
  let week = 0;
  while (true) {
    // 左区间
    let left = weeklyStart.add(week * 7, "day");
    // 右区间
    let right = left.add(7, "day");
    // console.log(left, right);
    // 在该区间内
    if (now.isBetween(left, right)) {
      return week + startWeek;
    }
    week++;
  }
};

const getContestLink = async () => {
  const week = calcWeekly();
  return await myAxios.post("/acwing/contest", { contest: week });
};

export { getContestLink };
