<!--
 * @Description: 当前天气
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 15:20:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 21:27:27
-->

<template>
  <a-card
    :title="curweather.values.province + '省' + curweather.values.city"
    style="background: transparent; color: #fff"
    headStyle="color:#fff"
    :bordered="false"
  >
    <template #extra>
      <a href="#">{{ curweather.values.weather }}</a>
    </template>
    <p>当前气温： {{ curweather.values.temperature }} ℃</p>
    <p>风向： {{ curweather.values.winddirection }}</p>
    <p>风力等级：{{ curweather.values.windpower }}</p>
    <p>空气湿度：{{ curweather.values.humidity }}</p>
    <p>更新时间：{{ curweather.values.reporttime }}</p>
  </a-card>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount } from "vue";
import { getCurrentWeather } from "@/api/weatherApi";

interface nowWeatherProps {
  city: string;
}

const props = withDefaults(defineProps<nowWeatherProps>(), {});
const { city = "北京" } = props;
// weather 数据请求 响应示例
let curweather = reactive({
  values: {
    province: "**",
    city: "***",
    weather: "*",
    temperature: "**",
    winddirection: "**",
    windpower: "*",
    humidity: "**",
    reporttime: "请求异常，请输入正确的地名",
  },
});

onBeforeMount(async () => {
  // 获取当前天气情况
  let res = await getCurrentWeather(city);
  if (res) {
    curweather.values = res?.data[0];
    // console.log(curweather);
  }
});
</script>

<style scoped></style>
