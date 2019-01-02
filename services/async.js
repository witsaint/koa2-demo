const syncTest = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.info('waiting for u')
      resolve()
    },time)
  })
}
module.exports = {
  syncTest: syncTest,
}