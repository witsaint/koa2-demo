/* 接口父类 */
class InterfaceController {
  constructor () {
  }

  static render (data = {}, msg = '', code = 200) {

  }

  renderSuccess () {
    InterfaceController.render({}, 'success', 200)
  }

  renderFailure () {
    InterfaceController.render({}, 'failure', 500)
  }

  getResBody () {
  }
}
module.exports = InterfaceController