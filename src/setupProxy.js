const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/saffrun**",
    createProxyMiddleware({
      target: "http://188.121.109.248:8000/api",
      changeOrigin: true,
      pathRewrite: { "^/saffrun": "" },
      secure: false,
    })
  );
};
