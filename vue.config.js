const path = require("path");
const packageJson = require("./package.json");
const utils = require("./build/utils/index.js");
const devServer = require("./build/utils/dev-server.js");
const { findPages } = require("./build/utils/entry-finder.js");
const TerserPlugin = require("terser-webpack-plugin");
// const SentryWebpackPlugin = require("@sentry/webpack-plugin");

// vue.config.js
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? ``
      : `/${packageJson.name}/`,
  configureWebpack: config => {
    utils.setAlias(config, "@components", "./src/components");
    utils.setAlias(config, "@entry", "./src/assets/entry.js");

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      // eslint-disable-next-line no-console
      console.log("production==========================================");
      config.optimization = {
        minimizer: [
          // 混淆代码
          new TerserPlugin({
            cache: true,
            parallel: true,
            // 生产环境不生成代码压缩映射文件
            sourceMap: process.env.ENVIRONMENT === "prd" ? false : true
          })
        ]
      };

      config.plugins.push(utils.zipPackage());

      // config.plugins.push(
      //   new SentryWebpackPlugin({
      //     release: packageJson.version,
      //     environment: process.env.ENVIRONMENT,
      //     include: path.resolve("dist/scripts/"),
      //     ignoreFile: ".sentrycliignore",
      //     ignore: ["node_modules", "vue.config.js"],
      //     // configFile: '.sentryclirc',
      //     urlPrefix: `~/${packageJson.name}/scripts/`
      //   })
      // );
    } else {
      // 为开发环境修改配置...
      // eslint-disable-next-line no-console
      console.log("development==========================================");
    }
  },
  // chainWebpack(config) {
  //   config.resolve.alias.set(
  //     "@configs",
  //     path.resolve("./configs/" + process.env.ENVIRONMENT + ".js")
  //   );
  // },
  devServer: {
    port: "8050",
    open: true,
    // 启用mock数据路由
    before(app) {
      devServer.install(app);
    }
  },
  pages: findPages().pages
};
