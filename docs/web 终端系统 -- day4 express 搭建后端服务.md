## web 终端系统 -- day4 express 搭建后端服务

### Express 相关依赖

> pnpm i express 
>
> pnpm i express-session -s

### 用户相关

#### model 层构建用户模型 及 相关依赖

需要安装orm 框架 sequelize 和 mysql 的连接依赖

> pnpm install -s sequelize
>
> pnpm install -s mysql2

安装 redis

> pnpm i -s redis @3
>
>  pnpm i -s connect-redis

安装 md5  （密码加密）

> pnpm i md5

安装 morgan (打印 日志)

> pnpm i morgan

安装 body-parser

> pnpm i body-parser

鱼皮大大 原项目中安装 但没有使用的依赖：

> nodemailer  邮箱发送功能常用于用户注册等业务逻辑
>
> random-string 生成随机字符串

#### service 层 写业务逻辑

##### 用户注册

**OP** 指的是 sequelize 里面的运算符 

逻辑： 验证 用户名 ，密码， 邮箱是否合法，如果合法，在数据库查 是否存在有重复的用户名或者邮箱，如果没有再进行插入

```js
async function userRegister(username, password, email) {
    // 校验是否为空
    if (!username || !password || !email) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    // 校验用户名长度
    if (username.length > 32) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
    }
    // 邮箱 校验
    const regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!regEmail.test(email)) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "邮箱非法");
    }
    // 检测 用户是否已存在 (通过查 是否有满足两点要求其中之一的)
    let user = await UserModel.findOne({
        where: {
            [Op.or]: [{ username }, { email }],
        },
        // 等同于 where username =  $username or email = $email
    });
    // 如果 能查到数据则返回异常
    if (user) {
        throw new MyError(
            REQUEST_PARAMS_ERROR_CODE,
            "用户名或者邮箱已经被注册过！"
        );
    }
    // 否则 插入新用户的信息
    const cryptoPassword = md5(password + SALT); // 密码加密
    user = await UserModel.create({
        username,
        password: cryptoPassword,
        email,
    });
    return user.id;
}

```

##### 用户登录

```js
/**
 * @description: 用户登录
 * @param {*} username  用户名
 * @param {*} password  密码
 * @param {*} req  请求体 做session缓存
 * @return {*}
 * @author: jlx
 */
async function userLogin(username, password, req) {
    // 校验
    if (!username || !password) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    // 加密 对比
    const cryptoPassword = md5(password + SALT);
    // 用户是否已存在
    let user = await UserModel.findOne({
        // include 返回值包含*** exclude 返回值不包含*** 不包含password 关键字段脱敏
        attributes: { exclude: ["password"] },
        where: {
            username,
            password: cryptoPassword,
        },
    });
    if (!user) {
        throw new MyError(NOT_FOUND_ERROR_CODE, "用户不存在或密码错误");
    }
    // 登录成功
    req.session.userInfo = user;
    return user;
}
```

##### 获取当前登录用户

```js
/**
 * @description: 获取当前登录的用户
 * @param {*} req
 * @return {*}
 * @author: jlx
 */
async function getLoginUser(req) {
    // 获取当前登录用户
    const { userInfo } = req.session;
    if (!userInfo && !userInfo.id) {
        throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
    }
    const currentUser = await UserModel.findByPk(userInfo.id);
    // 检查用户是否合法
    if (!currentUser) {
        throw new MyError(NOT_FOUND_ERROR_CODE, "找不到该用户");
    }
    return currentUser;
}
```

#### route 接口路由配置

```js
const routes = [{
        // 用户注册
        path: "/user/register",
        handler: require("./controller/userController").userRegisterApi,
    },
    {
        // 用户登录
        path: "/user/login",
        handler: require("./controller/userController").userLoginApi,
    },
    {
        // 用户登出
        path: "/user/logout",
        handler: require("./controller/userController").userLogoutApi,
    },
    {
        // 获取当前用户
        path: "/user/current",
        handler: require("./controller/userController").getLoginUserApi,
    },
];

module.exports = routes;
```

#### 运行调试过程中遇到的坑

npm redis 3 和 4 区别

<a href="https://github.com/redis/node-redis/blob/master/docs/v3-to-v4.md">github文档说明</a>

