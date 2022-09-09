<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 20:19:02
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-09 16:55:57
-->
<template>
  <XTerminal  ref="terminalRef" full-screen :on-submit-command="onSubmitCommand"></XTerminal>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
import { doCommandExecute } from '@/core/commandExecutor';
const terminalRef = ref<any>();

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  await doCommandExecute(inputText, terminal);
};
</script>


<style>
</style>