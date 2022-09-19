## web终端系统 -- day8 前端集成部分搜索命令（3）

考虑做这两个功能，是由于自己平时周末可能经常用这两个平台打打周赛

### leetcode 	力扣题目搜索和周赛入口

题目搜索原理同baidu等搜索引擎命令类似

#### 周赛入口

由于力扣周赛和双周赛都是有规律可循的，一般力扣周赛每周一次，双周赛每两周一次，所以当我们指定一个周一为初始时间，利用dayjs来每次+7或者+14天，就可以容易得到最新的周赛或者双周赛场数

> 由于是每次+7或者+14天，时间复杂度为O(n)

后期可以考虑优化成，求两个日期差，利用这个差对7或者14整除

> 这样时间复杂度为O(1)

一般来说，常数很小，所以两个运行效率没有太大区别

##### 计算周赛场数

```typescript
import dayjs from "@/plugins/myDayjs";

// 起始时间
let weeklyStart = dayjs("2022-09-12T00:00:00.000Z");
// 开始的周赛
let startWeek = 311;
// 开始的双周赛
let startBiWeek = 87;

/**
 * @description: 计算周赛第几场
 * @return {*}
 * @author: jlx
 */
const calcWeekly = () => {
  let now = dayjs(Date.now());
  let week = 0;
  while (true) {
    // 左区间
    let left = weeklyStart.add(week * 7, "day");
    // 右区间
    let right = left.add(7, "day");
    // console.log(left, right);
    // 在该区间内
    if (now.isBetween(left, right)) {
      return week + startWeek;
    }
    week++;
  }
};

/**
 * @description: 计算双周赛场数
 * @return {*}
 * @author: jlx
 */
const calcBiWeekly = () => {
  let now = dayjs(Date.now());
  let week = 0;
  while (true) {
    // 左区间
    let left = weeklyStart.add(week * 14, "day");
    // 右区间
    let right = left.add(7, "day");
    // console.log(left, right);
    // 在该区间内
    if (now.isBetween(left, right)) {
      return week + startBiWeek;
    }
    week++;
  }
};

export { calcWeekly, calcBiWeekly };
```

##### 实际命令

```typescript
import { CommandType } from "@/core/command";
import { calcBiWeekly, calcWeekly } from "./calcContest";

/**
 * @description: 力扣搜索命令
 * @return {*}
 * @author: jlx
 */
const leetcodeCommand: CommandType = {
  func: "leetcode",
  name: "搜索题目,周赛入口",
  alias: ["lc", "leet"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "weekly",
      alias: ["w"],
      desc: "最新周赛入口",
      type: "boolean",
    },
    {
      key: "biweekly",
      alias: ["b"],
      desc: "最新双周赛入口",
      type: "boolean",
    },
  ],
  action(options, terminal) {
    const { _, weekly, biweekly } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = "";
    // 如果 存在-w
    if (weekly) {
      // 返回合适的场数
      const entrance = calcWeekly();
      targetLink = `https://leetcode.cn/contest/weekly-contest-${entrance}`;
    }
    // 如果 存在-b
    else if (biweekly) {
      const entrance = calcBiWeekly();
      targetLink = `https://leetcode.cn/contest/biweekly-contest-${entrance}`;
    }
    // 没有 -w 和 -b的情况， 就搜索题目内容
    if (targetLink == "") {
      targetLink = `https://leetcode.cn/problemset/all/?search=${word}`;
    }
    window.open(targetLink);
  },
};

export default leetcodeCommand;
```

### acwing 搜索命令及周赛入口

#### 后端接口

acwing 周赛的时间和场数虽然是固定的，但是有一个很大问题是，周赛活动的id不是递增的（中间可能有其他活动），所以我们需要分析网页内容或者抓包获取周赛的链接，而通过抓包没有找到请求相应接口的xhr，但想到acwing是ssr渲染(服务端渲染)，所以我们需要的信息必定在网页源代码中，然后便可以分析一下acwing竞赛列表页的dom结构，后端使用axios获取网页源代码之后，利用cheerio来解析出dom结构，获取相应的数据即可。

该模块详情代码：

```typescript
const cheerio = require("cheerio");
const axios = require("axios");
const baseUrl = "https://www.acwing.com";

/**
 * @description: 请求acwing竞赛页 获取最近的竞赛列表
 * @return {*}
 * @author: jlx
 */
async function getAcwingDom() {
    return await axios
        .get(`${baseUrl}/activity/1/competition/`)
        .then((res) => res.data);
}

/**
 * @description: 获取竞赛活动的链接
 * @param {*} contest 竞赛标题
 * @return {*}
 * @author: jlx
 */
async function getContestLink(contest) {
    const dom = await getAcwingDom();
    const $ = cheerio.load(dom);
    for (let i = 0; i < 20; i++) {
        const links = baseUrl + $(".col-md-11 a").eq(i).attr("href");
        const title = $(".col-md-11 a .activity_title").eq(i).text();
        // console.log(links, title);
        if (contest == title) {
            // console.log(links);
            return links;
        }
    }
    return null;
}

module.exports = {
    getContestLink,
};
```

#### 前端实现

获取最新周赛时间和leetcode方法类似，搜索命令也可以直接照搬之前的写法

```typescript
import { CommandType } from "@/core/command";
import { getContestLink } from "./calcAcwContest";

/**
 * @description: acwing 搜索命令
 * @return {*}
 * @author: jlx
 */
const acwingCommand: CommandType = {
  func: "acwing",
  name: "搜索题目,周赛入口",
  alias: ["acw"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "weekly",
      alias: ["w"],
      desc: "最新周赛入口",
      type: "boolean",
    },
  ],
  async action(options, terminal) {
    const { _, weekly } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = "";
    // 如果 存在-w
    if (weekly) {
      // 返回合适的场数
      const entrance = await getContestLink();
      // console.log(entrance.data);
      targetLink = entrance.data;
    }
    // 没有 -w的情况， 就搜索题目内容
    else {
      targetLink = `https://www.acwing.com/problem/search/1/?csrfmiddlewaretoken=1&search_content=${word}`;
    }
    window.open(targetLink);
  },
};

export default acwingCommand;

```

### zhihu		知乎搜索

同baidu搜索命令类似

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  知乎 搜索关键词
 * @return {*}
 * @author: jlx
 */
const zhihuCommand: CommandType = {
  func: "zhihu",
  name: "知乎搜索关键词",
  alias: ["bhu"],
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
    // https://www.zhihu.com/search?type=content&q=
    let targetLink = `https://www.zhihu.com/search?type=content&q=${word}`;
    window.open(targetLink);
  },
};

export default zhihuCommand;


```



### douban	豆瓣搜索

同baidu搜索命令类似

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  豆瓣 搜索关键词
 * @return {*}
 * @author: jlx
 */
const doubanCommand: CommandType = {
  func: "douban",
  name: "豆瓣搜索关键词",
  alias: [],
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
    // https://www.douban.com/search?q=
    let targetLink = `https://www.douban.com/search?q=${word}`;

    window.open(targetLink);
  },
};

export default doubanCommand;

```



### bilibili 搜索

同baidu搜索命令类似

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  bilibili 搜索关键词
 * @return {*}
 * @author: jlx
 */
const bilibiliCommand: CommandType = {
  func: "bilibili",
  name: "bilibili搜索",
  alias: ["bili"],
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
    // https://search.bilibili.com/all?keyword=
    let targetLink = `https://search.bilibili.com/all?keyword=${word}`;

    window.open(targetLink);
  },
};

export default bilibiliCommand;
```

