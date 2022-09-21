<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 14:54:07
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 20:52:19
-->
<template>
  <div>
    <div>书签列表：</div>
    <div v-for="(bookmark, index) in bookmarkList" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ bookmark.keys }}</a-col>
        <a-col :span="8">{{ bookmark.url }}</a-col>
        <a-col :span="4">{{ bookmark.nickname }}</a-col>
        <a-col>{{ bookmark.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { getBookmarkList } from "@/api/userApi";
import bookmark = Bookmark.bookmarkType;
// 书签列表
const bookmarkList: Ref<bookmark[]> = ref([]);
// 获取书签列表
const getData = async () => {
  const result = await getBookmarkList();

  // console.log(result.data);
  bookmarkList.value = [...result.data];
};

onMounted(() => {
  getData();
});
</script>

<style scoped></style>
