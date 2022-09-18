<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:11:54
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 22:54:42
-->
<template>
  <a-spin :spinning="spinning">
    <InfiniteList
      :data="articleList"
      :width="'100%'"
      :height="height"
      :itemSize="50"
      :debug="debug"
      class="article"
      v-slot="{ item, index }"
      id="infintielist"
    >
      <a
        style="width: 100%; cursor: pointer; overflow: hidden"
        @click="handleClick(item.article_id)"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="brief">
          {{ item.brief }}
        </div>
      </a>
    </InfiniteList>
  </a-spin>
</template>

<script setup lang="ts">
import InfiniteList from "vue3-infinite-list";
import { getArticleRandom } from "@/api/articleApi";
import { ref, onMounted } from "vue";
import _ from "lodash";
// 声明 porps对象
interface articleProps {
  size: number;
}
// 接收props
const props = withDefaults(defineProps<articleProps>(), {});
// 页面请求的分页
const { size = 20 } = props;
// 无限滚动组件的调试状态
const debug = ref(false);
// 文章列表
let articleList = ref([]);
// 加载中
let spinning = ref(true);
// 容器高度
let height = ref(400);

/**
 * @description: 点击打开文章详情页
 * @param {*} aid
 * @return {*}
 * @author: jlx
 */
const handleClick = (aid: number) => {
  window.open(`https://juejin.cn/post/${aid}`);
};

/**
 * @description: 根据pageSize 获取随机文章
 * @param {*} size
 * @return {*}
 * @author: jlx
 */
const getArticles = async () => {
  const mocks = [...articleList.value];
  let result = await getArticleRandom(size);
  let datas: [] = result.data;
  //   console.log("result: ", result);
  for (let i = 0; i < datas.length; i++) {
    mocks.push(datas[i]);
  }
  articleList.value = mocks;
  //   console.log(articleList.value);
  spinning.value = false;
};
/**
 * @description: 处理滚动事件
 * @param {*} e
 * @return {*}
 * @author: jlx
 */
const scrollEvent = (e: any) => {
  // 滚动的像素+容器的高度>=可滚动的总高度 (保留10px的误差)
  if (
    e.srcElement.offsetHeight + e.srcElement.scrollTop + 10 >=
    e.srcElement.scrollHeight
  ) {
    //  触底后触发此事件
    getArticles();
  }
};

onMounted(() => {
  // 初始化数据
  getArticles();
  // 加上节流
  document
    .getElementById("infintielist")
    ?.addEventListener("scroll", _.debounce(scrollEvent, 500));
});
</script>

<style scoped>
.title {
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.brief {
  height: 25px;
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #86909c;
}
.article::-webkit-scrollbar,
.article-active::-webkit-scrollbar {
  width: 6px;
}

.article::-webkit-scrollbar-track,
.article-active::-webkit-scrollbar-track {
  background-color: #000;
  border-radius: 10px;
}

.article::-webkit-scrollbar-thumb,
.article-active::-webkit-scrollbar-thumb {
  background-color: #e4e4e4;
  border-radius: 10px;
}
</style>
