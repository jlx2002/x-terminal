<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:42:38
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 21:21:01
-->
<template>
  <div>
    <div>快捷键：</div>
    <div v-for="(shortcut, index) in shortcutList" :key="index">
      <a-row v-if="shortcut.desc" :gutter="16">
        <a-col :span="4">{{ shortcut.keyDesc ?? shortcut.code }}</a-col>
        <a-col :span="4">{{ shortcut.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { shortcutList } from "@/components/x-terminal/shortcut";

onMounted(() => {});
</script>

<style scoped></style>
