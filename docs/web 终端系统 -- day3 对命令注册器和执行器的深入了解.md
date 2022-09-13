## web 终端系统 -- day3 对命令注册器和执行器的深入了解

#### 命令注册器commandRegister

##### 命令列表：

```typescript
// 命令列表
const commandList: CommandType[] = [helpCommand];
```

利用ts 里面的类型限制创建一个类型为CommandType 的列表。

后续添加命令，利用import导入命令后，添加到命令列表即可。

##### 命令字典

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

##### 遍历赋值命令字典：

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

