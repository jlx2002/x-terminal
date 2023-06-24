# x-terminal - 终端化的浏览器主页

在线体验：[https://www.x-terminal.cn/ （预览时，可以使用help命令获取命令列表）](https://www.x-terminal.cn/ )

视频演示：[https://cdn.zutjlx.site/recording/x-terminal.mp4](https://cdn.zutjlx.site/recording/x-terminal.mp4)

## 6.24 更新

更新chat 命令 (支持 chatgpt3.5 版本智能对话)

目前预设的角色有: 
- english (英文学习助手)  
- sql (sql 终端机)
- command (command 命令提示助手)
- lang (语言检测)

> 最多支持保留4条上下文数据
> 单条问答最长支持2000token

## 快速启动项目

### 前端启动

在`x-terminal_frontend\src`目录下输入以下命令启动

```bash
pnpm install 
# 安装相关依赖
pnpm run dev
# 本地启动项目
```

### 后端启动

在`x-terminal_backend`目录下输入以下命令启动

```bash
pnpm install
# 安装相关依赖
pnpm run start
# 本地启动项目
```

## x-terminal 是什么？

一个很特别的浏览器主页，支持使用输入命令的方式来操作，目标是帮你在一个或多个 web 终端中高效完成搜索，周赛入口，听音乐，刷视频，预览文章等事情！ 

此外，它也是一个功能强大的 web 终端组件。开发者可以在它的基础上定制自己的 web 终端，并且可以在终端中集成任何内容！

### 1 分钟上手使用

使用  `help 命令英文名` 可以查询某命令的具体用法，如：`help search` 。

使用 `shortcut` 可以查看所有的快捷键。

## 项目优势

### 用户

- 无需鼠标，即可快速完成操作（比如从不同平台搜索内容）
- 支持快捷键、帮助和输入提示，降低使用成本
- 支持定制背景等，打造你的个性主页

### 开发者

- 可以独立使用功能丰富的 web 终端组件，或二次开发
- 可以开发自己的命令并接入系统

## 功能和特性

### web 终端

- 命令历史记录、快速执行历史命令
- 快捷键
- 清屏
- 命令输入提示
- Tab 键补全命令
- 多种格式输出
- 内置 5 种输出状态
- 命令折叠 / 展开
- 帮助手册自动生成
- 自定义配置（比如更换背景、提示开关等）
- 支持子命令

### 已支持命令

- 多平台搜索 search
- 查看日期 date
- 翻译 translate
- 天气 weather
- 更换背景 background
- 听音乐 music
- 文章 article
- 哔哩哔哩热门视频 video
- 力扣搜索题目和周赛入口 leetcode
- 其他（详情输入`help`命令查看）

## 技术栈

### 前端

主要技术：

- Vue 3
- Vite 3
- Ant Design Vue 3 组件库
- Pinia 2 状态管理
- TypeScript 类型控制

依赖库：

- axios 网络请求
- dayjs 时间处理
- lodash 工具库

### 后端

主要技术：

- Node.js
- Express、jwt
- MySQL
- Sequelize（ORM 框架）

依赖库：

- Axios
- NeteaseCloudMusicApi

依赖服务：

- 高德天气 API
- 新浪壁纸 API
- 哔哩哔哩视频API

## 目录结构

```
├─docs 文档
├─public 公共静态资源
└─src 源码目录
    ├─api 请求封装
    ├─assets 静态资源
    ├─components 组件
    │  ├─shared 公用组件
    │  └─x-terminal 
    ├─config 配置
    ├─core 核心
    │  └─commands 命令
    │      ├─bookmark 书签
    │      │  └─show 展示书签
    │      ├─relax 娱乐
    │      │  ├─article 文章
    │      │  ├─bilibili 哔哩哔哩视频
    │      │  ├─calculator 计算器
    │      │  └─netease 网易云音乐
    │      ├─search 搜索
    │      │  ├─acwing
    │      │  └─leetcode
    │      ├─terminal 微终端
    │      │  ├─config 配置
    │      │  ├─help 帮助命令
    │      │  ├─info 信息
    │      │  └─shortcut 快捷键
    │      ├─translate 翻译
    │      ├─user 用户
    │      │  └─subCommands 子命令
    │      └─weather 天气
    ├─plugins 插件
    ├─store 状态管理
    │  └─config
    ├─utils 辅助文件
    └─views 视图
```

## 系统设计

### 设计理念

1. 开放：采用类插件化设计，便于开发者自定义新命令，且能够通过配置自动生成帮助提示
2. 重前端轻后端：考虑到扩展性、安全性以及实现的方便，除了核心模块外，尽量不请求后端

### 核心

系统分为 3 个核心模块，各模块职责分明：

- 微终端：UI 展示和终端交互逻辑
- 命令系统：连接微终端和命令集（中介者），负责匹配、解析和执行命令，并通过终端提供的操作接口给予其反馈
- 命令集：各种不同功能的命令定义和实现

### 微终端

从 0 开始实现的 web 终端控制台，包含以下模块：

- 终端输入：常驻 Input 框，负责接收用户命令
- 终端输出：负责展示用户的命令及执行结果等，支持以下三种类型的输出
  - 命令类型：输入命令 + 结果列表
  - 文本类型：单行文本展示，内置 5 种不同的展示状态（成功、错误、警告、信息、系统等）
  - 自定义组件类型：可以自由定制要展示的内容
- 快捷键：更方便地操作终端，使用 `document.onkeydown` 全局按键事件实现
- 开放接口：提供一组操作终端的 API，供命令系统调用，比如清屏、立即输出等
- 命令历史：记录用户输入的命令结果，使用 Vue 3 Composition API 封装部分逻辑
- 命令提示：根据用户的输入给出提示，使用 Vue 3 Composition API 独立封装

### 命令系统

一套独立于终端的命令解析执行引擎，包含以下模块：

- 注册器：用于注册和管理可被匹配的命令集
- 匹配器：根据输入文本匹配到对应的命令
- 解析器：从输入文本中解析出参数和选项
- 执行器：执行命令，完成操作
- 子命令机制：支持递归解析子命令

### 命令集

一组可用命令的集合（类似插件），通过 TS 明确命令的定义，支持配置别名、选项、子命令等，便于开发者扩展和定制。

核心命令包括：

- 用户系统：管理用户、同步个人定制化内容
- 终端控制：定制或控制终端，比如更换背景、输出帮助等
- 搜索：可以快速从不同搜索引擎检索内容
- 其他模块。。。





