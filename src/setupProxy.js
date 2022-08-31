const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/saffrun**",
    createProxyMiddleware({
      target: "http://188.121.111.44:8000/api",
      changeOrigin: true,
      pathRewrite: { "^/saffrun": "" },
      secure: false,
    })
  );
};
