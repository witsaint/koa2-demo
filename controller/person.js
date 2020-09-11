const fs = require('fs');
const path = require('path');

const sync = require('./../services/async');
const Db = require('./../plugn/mysql-init').getDb();

const getMark = () => {
  return new Promise(((resolve, reject) => {
    Db.execute('SELECT mark FROM action_log WHERE id = 0', null, (err,rows) => {
      if(err) {
        reject();
      }
      if (rows && rows[0]) {
        resolve(rows[0].mark);
      } else {
        resolve(0);
      }
    });
  }))
};

const updateMark = (mark) => {
  return new Promise((resolve, reject) => {
    Db.execute(`UPDATE action_log SET mark = ${mark} WHERE id = 0`, null, (err,rows) => {
      console.info('err,rows', err,rows);
      resolve(true);
    });
  })
};
const getName = async function (ctx, next) {
  console.info(ctx.query);
  console.info(ctx.request.body);
  ctx.body = ctx.request.body.firstName
};
const createPer = async function (ctx, next) {
  Db.execute('SELECT * FROM `person`', null, (err,rows) => {
    console.info(err, rows)
  });
  ctx.body = {code: '200', 'message': '创建成功'}
};
const array = async function (ctx, next) {
  console.info('start');
  ctx.body = {code: '200', 'message': '创建成功'}
};
const markAction = async (ctx, next) => {
  const result = await getMark();
  await updateMark(result + 1);
  return ctx.body = {code: '200', 'message': '', data: result + 1 }
};
/**
 * 上传文件
 */
const uploadFile = async function  (ctx, next) {
  console.info('file',ctx.request.body);
  // 上传单个文件
  const file = ctx.request.body['fileNamePng']; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'public/images/') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
};
module.exports = {
  getName: getName,
  createPer: createPer,
  array:array,
  uploadFile: uploadFile,
  markAction: markAction
};
