const Router = require('koa-router');
const {getController} = require('../utils/File');
const path = require('path');
const config = require('../config/base');
const Human = require('../controller/Human');

module.exports = function (dir = config.controllerDir) {
  let route = new Router();
  let routeMap = getController(process.cwd() + path.sep + dir);
  for (var url in routeMap) {
    route.post('/' + url, routeMap[url])
  }
  route.post('/human', Human.run);
  return route.routes()
};
