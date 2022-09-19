## web终端系统 -- day6 前端集成部分搜索命令

### help 命令

主要分为help 和  help 单个命令，即查询所有命令的用法和单个命令的用法。

#### help * 查询所有命令的用法

```vue
<template>
  <div>
    <div>命令：{{ command.name }}</div>
    <div v-if="command.desc">介绍：{{ command.desc }}</div>
    <div v-if="command.alias && command.alias.length > 0">
      别名：{{ command.alias.join(", ") }}
    </div>
    <div>用法：{{ usageStr }}</div>
    <template
      v-if="command.subCommands && Object.keys(command.subCommands).length > 0"
    >
      <div>子命令：</div>
      <ul style="margin-bottom: 0">
        <li
          v-for="(subCommand, key, index) in command.subCommands"
          :key="index"
        >
          {{ subCommand.func }}
          {{ subCommand.name }}
          {{ subCommand.desc }}
        </li>
      </ul>
    </template>
    <template v-if="command.params && command.params.length > 0">
      <div>参数：</div>
      <ul style="margin-bottom: 0">
        <li v-for="(param, index) in command.params" :key="index">
          {{ param.key }}
          {{ param.required ? "必填" : "可选" }}
          {{ param.defaultValue ? `默认：${param.defaultValue}` : "" }}
          {{ param.desc }}
        </li>
      </ul>
    </template>
    <template v-if="command.options?.length > 0">
      <div>选项：</div>
      <ul style="margin-bottom: 0">
        <li v-for="(option, index) in command.options" :key="index">
          {{ getOptionKeyList(option).join(", ") }}
          {{ option.required ? "必填" : "可选" }}
          {{ option.defaultValue ? `默认：${option.defaultValue}` : "" }}
          {{ option.desc }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
import { CommandType } from "@/core/command";
import { getUsageStr, getOptionKeyList } from "./helpUtils";

interface HelpBoxProps {
  command: CommandType;
  parentCommand: CommandType;
}

const props = withDefaults(defineProps<HelpBoxProps>(), {});
const { command, parentCommand } = toRefs(props);

/**
 * 拼接用法字符串
 */
const usageStr = computed(() => {
  return getUsageStr(command.value, parentCommand.value);
});

onMounted(() => {});
</script>

<style scoped></style>
```

#### help 单个命令的用法

```vue
<template>
  <div>
    <div>
      ⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
    </div>
    <div>命令列表：</div>
    <div v-for="(command, index) in commandList" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ command.func }}</a-col>
        <a-col :span="4">{{ command.name }}</a-col>
        <a-col>{{ command.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { commandList } from "@/core/commandRegister";

onMounted(() => {});
</script>

<style scoped></style>
```

### search 	网页搜索

设定为 父级命令，通过子命令来设置搜索引擎，进而跳转相应的链接地址。和 命令注册器的思想类似

### baidu 	百度搜索

最简单的一个命令实现：

```typescript
import { CommandType } from "@/core/command";

/**
 * @description: 百度搜索命令
 * @return {*}
 * @author: jlx
 */
const baiduCommand: CommandType = {
  func: "baidu",
  name: "百度搜索",
  alias: [],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "picture",
      desc: "是否搜索图片",
      alias: ["p"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, picture } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = `https://www.baidu.com/s?wd=${word}`;
    // 搜索图片
    if (picture) {
      targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${word}`;
    }
    window.open(targetLink);
  },
};

export default baiduCommand;
```

### google	谷歌搜索

和 baidu 搜索类似

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  谷歌 搜索关键词
 * @return {*}
 * @author: jlx
 */
const googleCommand: CommandType = {
  func: "google",
  name: "谷歌搜索关键词",
  alias: ["chorme"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const word = _.length > 0 ? _[0] : "";
    //  https://www.google.com/search?q=
    let targetLink = `https://www.google.com/search?q=${word}`;
    window.open(targetLink);
  },
};

export default googleCommand;
```

### bing  必应搜索

同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  必应搜索
 * @return {*}
 * @author: jlx
 */
const bingCommand: CommandType = {
  func: "bing",
  name: "必应搜索",
  alias: [],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "picture",
      desc: "是否搜索图片",
      alias: ["p"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, picture } = options;
    const word = _.length > 0 ? _[0] : "";
    // https://cn.bing.com/search?q=b&FORM=HDRSC1
    let targetLink = `https://cn.bing.com/search?q=${word}`;
    // 搜索图片
    if (picture) {
      // https://cn.bing.com/images/search?q=b&form=HDRSC2&first=1&tsc=ImageHoverTitle
      targetLink = `https://cn.bing.com/images/search?q=${word}`;
    }
    window.open(targetLink);
  },
};

export default bingCommand;
```



