<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 20:19:02
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 21:01:33
-->
<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @edit="onEdit"
    style="height: 100%"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
    >
      <XTerminal :user="loginUser"></XTerminal>
    </a-tab-pane>
    <template #renderTabBar="{ DefaultTabBar, ...props }">
      <component :is="DefaultTabBar" v-bind="props" :style="tabsStyle" />
    </template>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, StyleValue } from "vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
/**
 * @description: 自定义标签页头部样式
 * @return {*}
 * @author: jlx
 */
const tabsStyle: StyleValue = {
  opacity: 0.4,
  border: 0,
  margin: 0,
  height: "1.5rem",
};

const panes = ref<
  { title: string; content: string; key: string; closable?: boolean }[]
>([
  { title: "终端1", content: "Content of Tab 1", key: "1", closable: false },
  { title: "终端2", content: "Content of Tab 2", key: "2" },
]);

const activeKey = ref(panes.value[0].key);

const newTabIndex = ref(2);

/**
 * @description: 添加某标签页
 * @return {*}
 * @author: jlx
 */
const add = () => {
  activeKey.value = `${++newTabIndex.value}`;
  panes.value.push({
    title: `新建终端`,
    content: "Content of new Tab",
    key: activeKey.value,
  });
};

/**
 * @description: 移除某标签页
 * @param {*} targetKey
 * @return {*}
 * @author: jlx
 */
const remove = (targetKey: string) => {
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter((pane) => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
  }
};

/**
 * @description: 标签页编辑操作
 * @param {*} targetKey
 * @param {*} action
 * @return {*}
 * @author: jlx
 */
const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === "add") {
    add();
  } else {
    remove(targetKey as string);
  }
};

const userStore = useUserStore();
const { loginUser } = storeToRefs(userStore);

onMounted(() => {
  // 修改标签页内容为全屏
  const content = document.querySelector(".ant-tabs-content");
  content?.setAttribute("style", "height: 100%");
  // 登录用户
  userStore.getAndSetLoginUser();
});
</script>

<style>
.ant-tabs-tab:hover {
  color: red;
}
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
  color: red;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: red;
  text-shadow: 0 0 0.25px currentcolor;
}
</style>
