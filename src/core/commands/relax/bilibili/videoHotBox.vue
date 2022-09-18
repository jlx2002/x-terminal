<!--
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 22:16:06
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 23:17:35
-->
<template>
  <div>
    <iframe
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      :src="videos[activeKey]"
      scrolling="auto"
    />
    <br />
    <a-space>
      <a-button ghost size="small" @click="handleBack">上一条视频</a-button>
      <a-button ghost size="small" @click="handleNext">下一条视频</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { getBiliBiliHotVideoByRid, getHotBiliBiliVideo } from "@/api/videoApi";
import { ref, onMounted } from "vue";

// 声明 porps对象
interface videoHotBoxProps {
  rid: number;
}
// 接收props
const props = withDefaults(defineProps<videoHotBoxProps>(), {});
// 页面请求的分页
const { rid = 1 } = props;
// 当前选择播放的视频id
let activeKey = ref(0);

// 页数和页容量
let pageNum = ref(1);
const pageSize = 10;

// 存储视频 链接的列表
// "https://player.bilibili.com/player.html?bvid=BV1uU4y1r7hJ"
let videos = ref<any>([]);

/**
 * @description: 上一条视频，对于处理0 - 1的情况，涉及一个巧妙的算法
 * @return {*}
 * @author: jlx
 */
const handleBack = () => {
  if (activeKey.value == 0) {
    // 循环算法，取0 - 1，返回到队尾
    activeKey.value = videos.value.length - 1;
  } else {
    activeKey.value -= 1;
  }
};

/**
 * @description: 下一条视频，每次id + 1，溢出时请求数据
 * @return {*}
 * @author: jlx
 */
const handleNext = () => {
  // 当下标溢出时，请求数据，扩容video数组
  if (activeKey.value + 1 == videos.value.length) {
    getVideos();
  }
  // 扩容后就可以直接 + 1
  activeKey.value++;
};

const getVideos = async () => {
  // 拷贝videos数组
  const mocks = [...videos.value];
  // 请求数据
  const result = await getBiliBiliHotVideoByRid(rid);
  // 返回的结果
  let datas = result?.data;
  for (let i = 0; i < pageSize; i++) {
    mocks.push(`https://player.bilibili.com/player.html?bvid=${datas[i].bvid}`);
  }
  videos.value = mocks;
  // 页数+1，方便下一次取数据
  pageNum.value++;
};

onMounted(() => {
  getVideos();
});
</script>

<style scoped></style>
