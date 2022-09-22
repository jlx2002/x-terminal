<!--
 * @Description: info 本站信息
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:42:29
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 20:28:02
-->
<template>
  <div>关于本站： 极客范儿的浏览器主页</div>
  <div>
    <a href="https://github.com/liyupi/yuindex" target="_blank">
      ~~本项目的灵感学习自鱼皮的yuIndex项目~~
    </a>
  </div>
  <div></div>
  <div>
    作者(掘金主页)：
    <a href="https://juejin.cn/user/4226983813447912" target="_blank">
      Acaax
    </a>
  </div>
  <!-- <div>
    友情链接(练手项目)：
    <a href="http://www.zutjlx.site:3000/" target="_blank"> 仿掘金官网 </a>
  </div> -->
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
