## web 终端系统 -- day2 对interface的设计的深入了解

### terminal 模块

#### 输出状态 （也就是输出时前面的tag)

```typescript
// 输出状态 
type OutputStatusType = "info" | "success" | "warning" | "error" | "system";
```

####  基础的 输出类型 

```typescript
// 输出类型
interface OutputType {
    type: "command" | "text" | "component"; // 限定type
    text?: string; // 文本值（一般是上次输入的命令或者上次命令执行后的返回文本）
    resultList?: OutputType[]; // 输出列表
    component?: any; // 在type == component时通过defineAsyncComponent 引入
    status?: OutputStatusType; // tag 标签内部的值，和上面OutputStatusType 相呼应，success 下 时limegreen 
    props?: any; // 在渲染子组件component时传递props对象
    collapsible?: boolean; // 是否展开
  }
```

type 里面的command 指定的是渲染每次输出命令的第一行，而text指的是输出命令的第二行 部分。

案例如下：

![text 和 command](http://cdn.zutjlx.site//image/202209092225642.png)

compoent 指的是 类型是组件的，例如输入help：

输出命令返回渲染的是 helpBox.vue（所有命令的返回组件）， CommandHelperBox.vue (单个命令的返回组件)。

这里是根据 component 的 **：is属性** 来实现的

```vue
  <component
      :is="output.component"
      v-if="output.type === 'component'"
      v-bind="output.props ?? {}"
    />
```

这里component 需要使用异步组件 defineAsyncComponent来引入

```typescript
 component: defineAsyncComponent(() => import("./HelpBox.vue")),
```

#### 命令输出类型（Command)

继承于  **OutputType**

```typescript
  // 命令类型输出
  interface CommandOutputType extends OutputType {
    type: "command";
    text: string; // text
    resultList: OutputType[];
  }
```

#### 文本输出类型（text）

继承于  **OutputType**

```typescript
  // 文本类型输出
  interface TextOutputType extends OutputType {
    type: "text";
    text: string;
  }
```

#### 组件输出类型（component）

继承于  **OutputType**

```typescript
  // 组件类型输出
  interface ComponentOutputType extends OutputType {
    type: "component";
    component: any;
    props?: any;
  }
```

#### 命令输入框类型 （ input）

限定了 commandInput 输入框内部内容的类型

```typescript
 // 命令输入类型
  interface CommandInputType {
    text: string; // 输入框内部的值
    placeholder?: string; 
  }
```

#### 终端类型 （terminal）----待完善

定义的是 终端类型的各种方法，后续待完善。

为什么定义终端类型？（个人感觉）

1.  在互相调用terminal 对象的各种方法时，更加规范
2.  可以通过暴露 terminal 对象，实现父组件或其他组件对terminal对象方法的调用，来实现解耦

> 这个设计思路感觉太秀了...

```typescript
 // 终端类型（定义一组访问及操作终端的方法）
  interface TerminalType {
    // 清屏
    clear: () => void;
    // 立即输出
    writeOutput: (output: OutputType) => void;
    // 立即输出文本
    writeTextOutput: (text: string, status?: OutputStatusType) => void;
    // 写命令文本结果
    writeTextResult: (text: string, status?: OutputStatusType) => void;
    // 写命令错误文本结果
    writeTextErrorResult: (text: string) => void;
    // 写命令成功文本结果
    writeTextSuccessResult: (text: string) => void;
    // 写命令结果
    writeResult: (output: OutputType) => void;
    // 提交命令
    doSubmitCommand: () => void;
    // 设置命令是否可折叠
    setCommandCollapsible: (collapsible: boolean) => void;
  }
```