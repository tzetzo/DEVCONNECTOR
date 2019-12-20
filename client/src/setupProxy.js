//https://stackoverflow.com/questions/52605997/when-specified-proxy-in-package-json-must-be-a-string
const proxy = require("http-proxy-middleware");
module.exports = app => {
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
};
