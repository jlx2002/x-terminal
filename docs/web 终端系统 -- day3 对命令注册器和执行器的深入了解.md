## web 终端系统 -- day3 对命令注册器和执行器的深入了解

### 命令注册器 CommandRegister

#### 命令列表：

```typescript
// 命令列表
const commandList: CommandType[] = [helpCommand];
```

利用ts 里面的类型限制创建一个类型为CommandType 的列表。

后续添加命令，利用import导入命令后，添加到命令列表即可。

#### 命令字典

利用一个ts里面的工具类型： **Record** 

**Record**
Record的内部定义，接收两个泛型参数；Record后面的泛型就是对象键和值的类型

作用 : 定义一个对象的 key 和 value 类型

源码：

> Record<key type, value type> 

逐步解析：

```typescript
// 命令字典
const commandMap: Record<string, CommandType> = {};
```

Key 即为第一个参数，如上就是将类型string进行遍历，也就是string，Value 为第二个映射的参数， 限定类型是CommandType。

也可以通过以下形式扩展key 或者 value的类型：

```typescript
const commandMap: Record<string | number, CommandType> = {};
```

> 表示 key的类型可以是string 或者 number

#### 遍历赋值命令字典：

```typescript
// 遍历赋值
commandList.forEach((command) => {
  // 命令的名字为键， 命令为值
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    // 命令的别名为键， 命令为值
    commandMap[name] = command;
  });
});
```

### 命令执行器 CommandExecutor

调用命令执行器的执行函数大概有以下过程：

1. 预处理传入的命令文本 （ 比如过滤敏感词，删除首尾空格，~~统一转小写~~）
2.  通过解析文本，得到命令
3.    利用getopts来解析命令得到参数
4.   如果有子命令，递归调用执行子命令
5.   调用执行命令，做某些action

#### 预处理文本

过滤敏感词（可能导致系统故障的词） => <u>后期待补</u>

```typescript
// 终端类型（定义一组访问及操作终端的方法） 
interface TerminalType {    // 清屏    clear: () => void;    // 立即输出    writeOutput: (output: OutputType) => void;    // 立即输出文本    writeTextOutput: (text: string, status?: OutputStatusType) => void;    // 写命令文本结果    writeTextResult: (text: string, status?: OutputStatusType) => void;    // 写命令错误文本结果    writeTextErrorResult: (text: string) => void;    // 写命令成功文本结果    writeTextSuccessResult: (text: string) => void;    // 写命令结果    writeResult: (output: OutputType) => void;    // 提交命令    doSubmitCommand: () => void;    // 设置命令是否可折叠    setCommandCollapsible: (collapsible: boolean) => void;  }
```

利用 trim 处理一下即可

```js
 //去除命令首尾空格
  text = text.trim();
  if (!text) {
    return;
  }
```

> 此处不太适合 统一转小写，因为可能出现中文字符或者命令大写字符特殊处理比如： -S  和 -s 语义不一样等情况

#### 解析文本得到命令

把文本通过空格进行切片，切片后，如果有父命令则在父命令中查找。

```typescript
/**
 * 获取命令（匹配）
 * @param text
 * @param parentCommand
 */
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  let func = text.split(" ", 1)[0];
  // 大小写无关
  func = func.toLowerCase();
  let commands = commandMap;
  // 有父命令，则从父命令中查找
  if (
    parentCommand &&
    parentCommand.subCommands &&
    Object.keys(parentCommand.subCommands).length > 0
  ) {
    commands = parentCommand.subCommands;
  }
  const command = commands[func];
  console.log("getCommand = ", command);
  return command;
};
```

#### 解析参数

利用 getopts 库 提取出关键词

```typescript

/**
 * 解析参数
 * @param text
 * @param commandOptions
 */
const doParse = (
  text: string,
  commandOptions: CommandOptionType[]
): getopts.ParsedOptions => {
  // 过滤掉关键词
  const args: string[] = text.split(" ").slice(1);
  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  };
  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  console.log("options: ", options);
  const parsedOptions = getopts(args, options);
  console.log("parsedOptions = ", parsedOptions);
  return parsedOptions;
};

```



