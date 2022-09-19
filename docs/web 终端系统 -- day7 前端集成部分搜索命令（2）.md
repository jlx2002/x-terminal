## web终端系统 -- day7 前端集成部分搜索命令（2）

### Gitee 搜索

和baidu 这类搜索命令类似

```typescript
import { CommandType } from "@/core/command";

/**
 * @description: gitee 仓库搜索
 * @return {*}
 * @author: jlx
 */
const giteeCommand: CommandType = {
  func: "gitee",
  name: "Gitee搜索开源项目",
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
    // https://search.gitee.com/?type=repository&q=
    let targetLink = `https://search.gitee.com/?type=repository&q=${word}`;
    window.open(targetLink);
  },
};

export default giteeCommand;
```

### GitHub 搜索

同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description: github 仓库搜索
 * @return {*}
 * @author: jlx
 */
const githubCommand: CommandType = {
  func: "github",
  name: "GitHub搜索开源项目",
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
    // https://github.com/search?q=vue
    let targetLink = `https://github.com/search?q=${word}`;
    window.open(targetLink);
  },
};

export default githubCommand;
```

### mdn 搜索

原理同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description: mdn 中文文档搜索关键词
 * @return {*}
 * @author: jlx
 */
const mdnCommand: CommandType = {
  func: "mdn",
  name: "mdn文档查询关键词",
  alias: ["mdn", "mozillamdn"],
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
    // https://developer.mozilla.org/zh-CN/search?q=json.stringfy&sort=best
    let targetLink = `https://developer.mozilla.org/zh-CN/search?q=${word}`;
    window.open(targetLink);
  },
};

export default mdnCommand;
```

### csdn 搜索关键词

原理同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  csdn 搜索关键词
 * @return {*}
 * @author: jlx
 */
const csdnCommand: CommandType = {
  func: "csdn",
  name: "csdn搜索",
  alias: ["csdn", "cs"],
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
    // https://so.csdn.net/so/search?q=
    let targetLink = `https://so.csdn.net/so/search?q=${word}`;

    window.open(targetLink);
  },
};

export default csdnCommand;
```

### 掘金 搜索关键词

原理同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description:  掘金 搜索关键词
 * @return {*}
 * @author: jlx
 */
const juejinCommand: CommandType = {
  func: "juejin",
  name: "掘金搜索关键词",
  alias: ["jue", "jin"],
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
    //  https://juejin.cn/search?query=
    let targetLink = `https://juejin.cn/search?query=${word}`;
    window.open(targetLink);
  },
};

export default juejinCommand;
```

### 菜鸟教程

原理同上

```typescript
import { CommandType } from "@/core/command";

/**
 * @description: 菜鸟教程 搜索关键词
 * @return {*}
 * @author: jlx
 */
const cainiaoCommand: CommandType = {
  func: "cainiao",
  name: "菜鸟教程查询关键词",
  alias: ["rookie", "cai"],
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
    // https://www.runoob.com/?s=js
    let targetLink = `https://www.runoob.com/?s=${word}`;
    window.open(targetLink);
  },
};

export default cainiaoCommand;
```

