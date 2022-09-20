## web终端系统 -- day15 acw活动入口

### 后端接口

根据keywords 获取活动链接

```js
/**
 * @description: 获取acwing 的activity
 * @param {*} keywords
 * @return {*}
 * @author: jlx
 */
async function getAcwingActivity(keywords) {
    if (!keywords || keywords == "") {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "请求参数错误");
    }
    const result = await getActivityLink(keywords);
    console.log(result);
    if (!result) {
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE, "第三方服务接口异常");
    }
    return result;
}
```

### 前端改写acwing命令：

加上 -a 的options配置activity

命令代码：

```typescript
import { CommandType } from "@/core/command";
import { getContestLink, getActivityLink } from "./calcAcwContest";

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
    {
      key: "activity",
      alias: ["a"],
      desc: "活动入口",
      type: "boolean",
    },
  ],
  async action(options, terminal) {
    const { _, weekly, activity } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = "";
    // 如果 存在-w
    if (weekly) {
      // 返回合适的场数
      const entrance = await getContestLink();
      // console.log(entrance.data);
      targetLink = entrance.data;
    } else if (activity) {
      // 返回合适的活动入口链接
      const entrance = await getActivityLink(word);
      // 如果 入口链接为空
      if (!entrance.data) {
        terminal.writeTextErrorResult("活动关键词没有找到！");
        return;
      }
      targetLink = entrance.data;
    }
    // 没有 -w 和 -a的情况， 就搜索题目内容
    else {
      targetLink = `https://www.acwing.com/problem/search/1/?csrfmiddlewaretoken=1&search_content=${word}`;
    }
    window.open(targetLink);
  },
};

export default acwingCommand;
```

