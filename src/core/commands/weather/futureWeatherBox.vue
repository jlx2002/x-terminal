<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 16:35:24
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 20:50:33
-->

<template>
  <a-row :gutter="16">
    <a-col :span="6" v-for="weather in futureWeather">
      <a-card
        :title="weather.date"
        style="background: transparent; color: #fff"
        headStyle="color:#fff"
      >
        <template #extra>
          <a href="#">星期 {{ zhWeek(weather.week) }}</a>
        </template>
        <p>白天天气：{{ weather.dayweather }}</p>
        <p>夜间天气：{{ weather.nightweather }}</p>
        <p>白天最高气温：{{ weather.daytemp }}</p>
        <p>夜间最低气温：{{ weather.nighttemp }}</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from "vue";
import { getFutureWeather } from "@/api/weatherApi";

interface futureWeatherProps {
  city: string;
}

const props = withDefaults(defineProps<futureWeatherProps>(), {});
const { city = "北京" } = props;

let futureWeather = reactive([] as any);

/**
 * @description: 星期转换为中文
 * @param {*} week
 * @return {*}
 * @author: jlx
 */
let zhWeek = (week: string) => {
  switch (week) {
    case "1":
      return "一";
    case "2":
      return "二";
    case "3":
      return "三";
    case "4":
      return "四";
    case "5":
      return "五";
    case "6":
      return "六";
    case "7":
      return "日";
  }
};
onBeforeMount(async () => {
  // 获取未来三天 天气情况
  let res = await getFutureWeather(city);
  if (res) {
    futureWeather.push(...res?.data[0].casts);
    // console.log(futureWeather);
  }
});
</script>

<style scoped></style>
