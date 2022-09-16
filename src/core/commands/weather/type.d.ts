/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 17:17:04
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 17:27:57
 */
declare namespace weather {
  interface nowWeather {
    province: string; // 省份
    city: string; // 城市
    adcode: string; // 城市编码
    weather: string; // 天气
    temperature: string; // 温度
    winddirection: string; // 风向
    windpower: string; // 风级
    humidity: string; // 湿度
    reporttime: string; // 报道时间
  }
  interface dayWeather {
    date: string; // 日期
    week: string; // 星期
    dayweather: string; // 白天气温
  }
}
