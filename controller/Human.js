const InterfaceController = require('./InterfaceController');
class Human extends InterfaceController{
  constructor () {
    super()
  }
  static async run (ctx, next) {
    console.info(ctx.request.body);
    ctx.body = ctx.request.body.firstName
  }
}
module.exports = Human;
