const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  // proxy middleware options
  let prefix = "/apis";
  if (!req.url.startsWith(prefix)) {
    return;
  }
  let target = "https://abc.zutjlx.site/api" + req.url.substring(prefix.length);

  console.log(target);
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 例如 /api/user/login 将被转发到 http://target/user/login
      "^/apis/": "/",
    },
  })(req, res);
};
