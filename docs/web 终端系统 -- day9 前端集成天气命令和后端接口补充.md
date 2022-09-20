## web终端系统 -- day9 前端集成天气命令和后端接口补充

### weather 接口后端

查询天气条件，必须要传city 参数。

使用的key 是通过申请高德api 获取的

#### 获取当前天气 

```js
/**
 * @description: 根据高德api 获取实时天气
 * @param {*} city
 * @return {*}
 * @author: jlx
 */
async function getCurrentWeather(city = "北京") {
    city = encodeURI(city);
    const api = `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`;
    return await axios.get(api).then((res) => res.data.lives);
}
```

#### 获取未来三天天气预测

```js
/**
 * @description: 根据高德api 获取未来三天预测天气
 * @param {*} city
 * @return {*}
 * @author: jlx
 */
async function getFutureWeather(city = "北京") {
    city = encodeURI(city);
    const api = `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}&extensions=all`;
    return await axios.get(api).then((res) => res.data.forecasts);
}
```

### weather 前端实现

前端实现options 来区分查询未来三天还是当下，来通过options 选择输出 不同的组件

#### weatherCommand 命令实现

```typescript
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: 天气命令
 * @return {*}
 * @author: jlx
 */
const weatherCommand: CommandType = {
  func: "weather",
  name: "天气预报",
  alias: ["wea"],
  params: [
    {
      key: "city",
      desc: "城市名称",
      required: true,
    },
  ],
  options: [
    {
      key: "now",
      desc: "当前天气",
      alias: ["n"],
      type: "boolean",
      defaultValue: true,
    },
    {
      key: "future",
      desc: "未来三天天气",
      alias: ["f"],
      type: "boolean",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _, now, future } = options;
    const city = _.length > 0 ? _[0] : "";
    // 如果 城市为空
    if (city == "") {
      terminal.writeTextErrorResult("城市参数不能为空！");
      return;
    }
    // 获取未来三天的天气预报
    if (future) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./futureWeatherBox.vue")),
        props: {
          city,
        },
      };
      terminal.writeResult(output);
      return;
    }
    // 如果不选择 future
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./nowWeatherBox.vue")),
      props: {
        city,
      },
    };
    terminal.writeResult(output);
    return;
  },
};

export default weatherCommand;

```



#### nowwhetherBox组件

该组件主要是当前天气的获取，信息整合

```vue
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
```

#### futurewhetherBox组件

该组件主要是对未来天气预测的获取，信息整合

```vue
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

```

