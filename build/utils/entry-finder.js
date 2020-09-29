const glob = require("glob");
const { resolve } = require("path");
const fs = require("fs");

const { getChannelSuffix } = {
  getChannelSuffix: function() {
    return "";
  }
};

/**
 * 忽略文件
 **/
const ignoreFile = {
  "views/login": true
};

/**
 * 入口查找工具，构建动态入口
 */
exports.findPages = function findPages() {
  const pages = {}; // 页面

  const pagesPath = resolve(__dirname, "../../src/views"); // pages的路径
  const pagesFolder = "src/views"; // pages文件夹
  const channelSuffix = getChannelSuffix(); // 文件的渠道后缀名
  const mainHtml = `main${channelSuffix}.html`; // 入口html文件名

  glob.sync(`**/${mainHtml}`, { cwd: pagesPath }).forEach(path => {
    if (process.env.NODE_ENV === "production") {
      //忽略文件
      let pathFolder = path.substr(0, path.lastIndexOf("/"));
      if (ignoreFile[pathFolder]) {
        return;
      }
    }

    const chunkMatcher = path.match(new RegExp(`(.+)/${mainHtml}$`)); // 多重目录，使用.分隔
    const chunkName = chunkMatcher[1];

    const mainJs = `${pagesFolder}/${chunkName}/main.js`; // 入口js
    const mainJsChannel = `${pagesFolder}/${chunkName}/main${channelSuffix}.js`; // 入口js-渠道的

    // 默认设置页面无入口模块
    let entryJs = null;
    // 如果入口脚本存在，则生成入口chunk
    if (fs.existsSync(mainJsChannel)) {
      // 如果有渠道入口文件，就用渠道的主文件
      entryJs = mainJsChannel;
    } else if (fs.existsSync(mainJs)) {
      // 如果没有渠道入口文件，就用主文件
      entryJs = mainJs;
    }

    pages[chunkName] = {
      // page 的入口
      entry: entryJs,
      // 模板来源
      template: `${pagesFolder}/${path}`,
      // 在 dist/index.html 的输出
      // filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: "title",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", chunkName],
      head:
        '<meta charset="UTF-8" /><link rel="icon" href="data:image/ico;base64,aWNv" /><meta name="format-detection" content="telephone=no" /><meta name="apple-mobile-web-app-capable" content="yes" />'
    };
  });

  return {
    pages
  };
};
