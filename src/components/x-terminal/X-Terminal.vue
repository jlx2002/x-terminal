<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 20:07:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-07 22:44:47
-->
<template>
  <div class="terminal-wrapper" :style="wrapperStyle">
    <div ref="terminalRef" class="terminal" :style="mainStyle">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="right"
      >
        <div class="terminal-row">
          <a-input
            ref="commandInputRef"
            v-model:value="text"
            :disabled="isRunning"
            class="command-input"
            :placeholder="placeholder"
            :bordered="false"
            autofocus
            @press-enter="doSubmitCommand"
          >
            <template #addonBefore>
              <span class="command-input-prompt">{{ prompt }}</span>
            </template>
          </a-input>
        </div>
      </a-collapse>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "XTerminal",
};
</script>

<script setup lang="ts">
import { computed, StyleValue, ref } from "vue";
const activeKeys = ref<number[]>([]);
let text = ref("");
let isRunning = ref(false);
let placeholder = ref("输入");
const doSubmitCommand = () => {
  console.log(text.value);
};
let prompt = ref("hh");
/**
 * 终端主样式
 */
const mainStyle = computed(() => {
  const fullScreenStyle: StyleValue = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return fullScreenStyle;
});

/**
 * 终端包装类主样式
 */
const wrapperStyle = computed(() => {
  const background =
    "https://tva2.sinaimg.cn/large/9bd9b167gy1g4lizxwzlrj21hc0xcqv5.jpg";
  const style = {
    ...mainStyle.value,
  };
  if (background.startsWith("http")) {
    style.background = `url(${background})`;
  } else {
    style.background = background;
  }
  return style;
});
</script>

<style scoped>
.terminal-wrapper {
  background: black;
}

.terminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

.terminal::-webkit-scrollbar {
  display: none;
}

.terminal span {
  font-size: 16px;
}

.terminal
  :deep(.ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header) {
  color: white;
  padding: 0;
}

.terminal :deep(.ant-collapse) {
  background: none;
}

.terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>