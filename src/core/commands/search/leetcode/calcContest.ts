/*
 * @Description: 计算力扣周赛和双周赛场数
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 20:12:51
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 11:17:25
 */
import dayjs from "@/plugins/myDayjs";

// 起始时间
let weeklyStart = dayjs("2022-09-12T00:00:00.000Z");
// 开始的周赛
let startWeek = 311;
// 开始的双周赛
let startBiWeek = 87;

/**
 * @description: 计算周赛第几场
 * @return {*}
 * @author: jlx
 */
const calcWeekly = () => {
  let now = dayjs(Date.now());
  let week = 0;
  while (week < 300) {
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

/**
 * @description: 计算双周赛场数
 * @return {*}
 * @author: jlx
 */
const calcBiWeekly = () => {
  let now = dayjs(Date.now());
  let week = 0;
  while (week < 300) {
    // 左区间
    let left = weeklyStart.add(week * 14, "day");
    // 右区间
    let right = left.add(7, "day");
    // 在该区间内
    if (now.isBetween(left, right) || right.isAfter(now)) {
      return week + startBiWeek;
    }
    week++;
  }
};

export { calcWeekly, calcBiWeekly };
