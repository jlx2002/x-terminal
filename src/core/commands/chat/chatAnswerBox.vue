<!--
 * @Description: 请填写文件简介
 * @Autor: jlx
 * @Date: 2023-06-20 22:29:16
 * @LastEditors: jlx
-->
<template>
  <v-md-preview :text="answer" style="margin-left: 20px"></v-md-preview>
</template>
<script setup lang="ts">
import useChat from "./useChat";
import { ref, onMounted } from "vue";

interface chatAnswerProps {
  message: string;
  role: string;
}

const props = withDefaults(defineProps<chatAnswerProps>(), {});
const { role = "default", message = "你好" } = props;

let answer = ref("你好！有什么我可以帮助你的吗？");

const { getChatAnswer } = useChat({ answer });

onMounted(() => {
  getChatAnswer(message, role);
});
</script>
<style scoped>
:deep(.vuepress-markdown-body) {
  color: #a3968e;
  background-color: transparent;
}
</style>
