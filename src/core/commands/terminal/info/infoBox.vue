<!--
 * @Description: info 本站信息
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:42:29
 * @LastEditors: jlx
 * @LastEditTime: 2022-10-04 09:38:27
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
  <div>
    友情链接(懒人导航网)：
    <a href="https://lanrenao.com" target="_blank">
      懒人导航网 | 全网最实用简洁的懒人导航
    </a>
  </div>
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
