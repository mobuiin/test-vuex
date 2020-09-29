const path = require("path");
const { zipPackage } = require("./zip-package.js");

/**
 * 设置别名
 * @config vue-cli 配置
 * @alias 别名
 * @src 路径
 **/
exports.setAlias = function(config, alias, src) {
  config.resolve.alias[alias] = path.resolve(src);
};

exports.zipPackage = zipPackage;
