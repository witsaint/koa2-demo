const fs = require('fs');
const path = require('path')
var isJsFile = (fileName) => {
  return fileName.endsWith('.js')
}

function getJsModule (jsFile) {
  if (isJsFile(jsFile)) return require(jsFile);
  return {}
}

/* 循环遍历 递归操作 对于文件操作方法暴露 */
function traversalFile (filePath, func) {
  var files = fs.readdirSync(filePath)
  for (i in files) {
    let fName = files[i]
    let childPath = filePath + path.sep + fName
    let stats = fs.statSync(childPath)
    if (stats.isDirectory()) {
      traversalFile(childPath)
    } else {
      func(childPath, fName)
    }
  }
}

/* 获取位于默认（/controller）下的路由函数 */
function getController (dir) {
  var routerFuncMap = {}
  traversalFile(dir, (f, fName) => {
    let funcMap = getJsModule(f)
    console.info(funcMap)
    for (var funcName in funcMap) {
      routerFuncMap[fName.substr(0, fName.length - 3) + '/' + funcName] = funcMap[funcName]
    }
  })
  console.info(routerFuncMap)
  return routerFuncMap
}

function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}
function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

module.exports = {
  getJsModule: getJsModule,
  traversalFile: traversalFile,
  getController: getController,
  checkDirExist: checkDirExist,
  getUploadFileExt: getUploadFileExt
}
