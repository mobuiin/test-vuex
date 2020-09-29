const bodyParser = require("body-parser");
const moment = require("moment");

exports.install = function install(app) {
  app.use(bodyParser.json());
  app.post("/api/*", apiServer);
  app.get("/api/*", apiServer);
  app.put("/api/*", apiServer);
  app.delete("/api/*", apiServer);
};

// function cleanCache(module) {
//   const path = require.resolve(module);
//   require.cache[path] = null;
// }

function apiServer(req, res) {
  try {
    const mockJSModule = `../../mock-data${req.path.slice(4)}.js`;
    const dataJS = require(mockJSModule);

    res.json(dataJS(req.body, req.query, req.path));

    // cleanCache(mockJSModule);

    // eslint-disable-next-line no-console
    console.log(
      `\x1b[32m [Mock Server] [${moment().format(
        "YYYY-MM-DD hh:mm:ss"
      )}] \x1b[0m ${req.method} ${req.path} \x1b[32m 200 \x1b[0m`
    );
  } catch (e) {
    res.status(404).end();

    // eslint-disable-next-line no-console
    console.log(
      `\x1b[31m [Mock Server] [${moment().format(
        "YYYY-MM-DD hh:mm:ss"
      )}] \x1b[0m ${req.method} ${req.path} \x1b[31m 404 \x1b[0m`
    );
  }
}
