// "koa-body": "^2.3.0" 根据koa-body依赖处理request会有content-type为form-data的时候 在body外层加壳fields和file
const isFormDataHeader = /^multipart\/form-data\.*?/g
const handleRes = async function handleRes (ctx, next) {
  console.info('this request url:' + ctx.url)
  let resHeader = ctx.request.header
  let resBody = ctx.request.body
  if (isFormDataHeader.test(resHeader['content-type'])) {
    ctx.request.body = Object.assign(resBody.fields, resBody.files)
  }
  // 下一步
  await next()
}
module.exports = handleRes
