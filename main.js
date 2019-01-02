const Koa = require('koa');
const koaBody = require('koa-body');
const controller = require('./middleware/controller');
const session = require('koa-session-minimal')
var http = require('http');
var https = require('https');
var fs = require('fs');
const path = require('path')
var enforceHttps = require('koa-sslify');
const {getUploadFileExt, checkDirExist} = require('./utils/File')
// mysql
const mysqlInit = require('./plugn/mysql-init')
const beforeMethodsInterceptor = require('./middleware/beforeMethodsInterceptor');
const afterMethodsInterceptor = require('./middleware/afterMethodsIntercepror');

const uploadFileNamePath = 'public/images/'
// init
const app = new Koa()
mysqlInit.init() // 初始化mysql

// middle
app.use(koaBody({
  multipart: true,  // 允许上传多个文件
  formidable: {
    uploadDir: uploadFileNamePath,// 上传的文件存储的路径
    keepExtensions: true,  //  保存图片的扩展名
    onFileBegin: (name, file) => {
      // 最终要保存到的文件夹目录
      const dir = path.join(__dirname,`${uploadFileNamePath}${file.name}`);
      checkDirExist(uploadFileNamePath)
      file.path = dir
    }
  }
}))
// Force HTTPS on all page
// app.use(enforceHttps());
// SSL options
var options = {
  key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
  cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
};

// 应用处理 session 的中间件
app.use(session({
  key: 'session-id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
  cookie: {                   // 与 cookie 相关的配置
    domain: 'localhost',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    maxAge: 1000 * 30,      // cookie 有效时长
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: false        // 是否允许重写
  }
}))
// index page
// app.use(function * (next) {
//   this.body = "hello world from " + this.request.url;
// });
app.use(beforeMethodsInterceptor);
app.use(controller());
app.use(afterMethodsInterceptor);
// https.createServer().listen(3000);
// app.listen(3000);

// start the server
// http.createServer(app.callback()).listen(4001);
https.createServer(options, app.callback()).listen(4000);

console.info('........ https server is running ........');
