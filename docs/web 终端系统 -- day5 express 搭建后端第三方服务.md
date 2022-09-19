## web终端系统 -- day5 express 搭建后端第三方服务

接口服务全部使用post 方式

传参从body 传入

### 第三方 服务

#### 网易云音乐api

> pnpm i NeteaseCloudMusicApi

##### 根据关键词搜索 获取单首音乐

```js
/**
 * @description: 根据关键词搜索音乐 歌单
 * @param {*} keywords 关键词
 * @param {*} limit 分页大小 不传参默认是10
 * @return {*}
 * @author: jlx
 */
async function searchMusics(keywords, limit = 10) {
    if (!keywords) {
        return [];
    }
    try {
        const result = await cloudsearch({
            keywords,
            type: 1, // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1
            limit,
        });
        if (result.status !== 200) {
            return [];
        }
        const songs = result.body.result.songs;
        return songs ? songs : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
```

##### 获取音乐排行榜热榜 hot100

```js
/**
 * @description: 获取网易云hot100
 * @return {*}
 * @author: jlx
 */
async function playlistDetail() {
    // 热歌榜 id
    const HOT_SONGS_PLAY_LIST_ID = 3778678;
    const result = await playlist_detail({
        id: HOT_SONGS_PLAY_LIST_ID,
    });
    return result.body.playlist.tracks;
}
```

#### 搏天 api 

##### 获取随机壁纸

> pnpm i axios 

发送axios 请求获取随机壁纸的url

```js
/**
 * @description: 获取单张壁纸
 * @return {*}
 * @author: jlx
 */
async function getSingleWallPapper() {
    const result = await getRandomBackground();
    if (!result) {
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE);
    }
    return result;
}
```

##### 翻译

```js

/**
 * @description: 获取翻译的结果
 * @param {*} sentence 待翻译的句子
 * @return {*}
 * @author: jlx
 */
async function getTranslateChToEn(sentence) {
    if (!sentence) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    const result = await getTranslateAns(sentence);
    if (!result) {
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE);
    }
    return result;
}
```



#### 掘金文章api

先爬取掘金文章，利用orm框架sequelize 创建article 表和插入相应的数据。

爬取掘金文章代码开源地址：[gitee仓库地址](https://gitee.com/jlx20020820/juejin-spider)

相应的service 层代码主要实现返回随即给定size 的文章列表

```js
const MyError = require("../exception");

const {
    NO_AUTH_ERROR_CODE,
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");

const ArticleModel = require("../model/article");
const sequelize = require("../db");

async function getArticle(limits = 10) {
    let articles = await ArticleModel.findAll({
        limit: limits,
        order: sequelize.random(),
    });
    if (!articles) {
        throw new MyError(NOT_FOUND_ERROR_CODE, "数据找不到了！");
    }
    return articles;
}
module.exports = {
    getArticle,
};
```

#### 哔哩哔哩api

##### 获取热门排行榜

```js
/**
 * @description: 分页获取热门视频 列表
 * @param {*} pn 页码
 * @param {*} ps 每页项数
 * @return {*}
 * @author: jlx
 */
async function getBiliHotList(pn, ps) {
    if (ps <= 0 || pn <= 0) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "请求参数错误");
    }
    const result = getBilibiliHot(pn, ps);
    if (!result) {
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE);
    }
    return result;
}
```

##### 获取近期 分区视频排行榜

分区id对应rid：在另一个文档中整理了b站的分区视频列表相关编号

```js
/**
 * @description: 获取分区热门视频
 * @param {*} rid 分区id
 * @return {*}
 * @author: jlx
 */
async function getKindHotByRid(rid) {
    if (rid <= 0) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "请求参数错误");
    }
    const result = getBilibiliRankTopByRid(rid);
    if (!result) {
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE);
    }
    return result;
}
```

