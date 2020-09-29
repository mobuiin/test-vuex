const packageJson = require("../../package.json");
const moment = require("moment");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const zipPackage = function() {
  return new FileManagerPlugin({
    onEnd: {
      mkdir: ["./packages"],
      delete: ["./dist/**/*.map"],
      archive: [
        {
          source: "./dist",
          destination: `./packages/${packageJson.name}.${
            process.env.ENVIRONMENT
          }.${moment().format("YY-MM-DD_hh:mm:ss")}.zip`
        },
        {
          source: "./dist",
          destination: `./packages/${packageJson.name}.latest.zip`
        }
      ]
    }
  });
};

exports.zipPackage = zipPackage;
