<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 20:07:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-08 16:49:12
-->
<template>
  <div class="terminal-wrapper" :style="wrapperStyle">
    <div ref="terminalRef" class="terminal" :style="mainStyle">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 折叠 -->
          <a-collapse-panel
            v-if="output.collapsible"
            :key="index"
            class="terminal-row"
          >
            <template #header>
              <span style="user-select: none; margin-right: 10px">
                {{ prompt }}
              </span>
              <span>{{ output.text }}</span>
            </template>
            <div
              v-for="(result, idx) in output.resultList"
              :key="idx"
              class="terminal-row"
            >
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令及结果-->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{
                  prompt
                }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div
                v-for="(result, idx) in output?.resultList"
                :key="idx"
                class="terminal-row"
              >
                <content-output :output="result" />
              </div>
            </template>
            <!-- 打印信息 -->
            <template v-else>
              <div class="terminal-row">
                {{ output.text }}
              </div>
            </template>
          </template>
        </template>
        <div class="terminal-row">
          <a-input
            ref="commandInputRef"
            v-model:value="inputCommand.text"
            :disabled="isRunning"
            class="command-input"
            :placeholder="inputCommand.placeholder"
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
import UserType = User.UserType;
import CommandOutputType = Terminal.CommandOutputType;
import OutputType = Terminal.OutputType;
import CommandInputType = Terminal.CommandInputType;
import TerminalType = Terminal.TerminalType;
import TextOutputType = Terminal.TextOutputType;
import OutputStatusType = Terminal.OutputStatusType;
// props 对象类型声明
interface TerminalProps {
  height?: string | number;
  fullScreen?: boolean;
  user?: UserType;
  onSubmitCommand?: (inputText: string) => void;
}
// 折叠面板
const activeKeys = ref<number[]>([]);
// 初始化命令
const initCommand: CommandInputType = {
  text: "",
  placeholder: "请输入命令",
};
// 输入框
let inputCommand = ref<CommandInputType>({ ...initCommand });
// 命令输出结果
let outputList = ref<OutputType[]>([]);
// 命令是否正在执行
let isRunning = ref(false);
// 全局记录当前命令
let currentNewCommand: CommandOutputType;
const doSubmitCommand = () => {
  // 输入框加锁
  isRunning.value = true;
  let inputText = inputCommand.value.text;
  outputList.value.push({
    type: "text",
    text: inputText,
  });
  // 执行命令
  const newCommand: CommandOutputType = {
    text: inputText,
    type: "command",
    resultList: [],
  };
  currentNewCommand = newCommand; // 记录当前命令，以便写入结果

  // 输入框  恢复原样
  inputCommand.value = { ...initCommand };
  isRunning.value = false;
};
// 输入框前缀 后期可以 换成 userName
let prompt = ref("[local]$");
// 终端主要样式，可以换成接收 height
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

// 终端包装类主样式
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