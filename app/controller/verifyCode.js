const Controller = require('egg').Controller;
class VerifyController extends Controller {
async verify() {
    const { ctx } = this;
    // 服务里面的方法
    let captcha = await this.service.verifyCode.captcha();
    // 返回的类型
    ctx.response.type = 'image/svg+xml';  
    // {data: '<svg.../svg>', text: 'abcd'}
    ctx.body = {code:0,data:captcha.data}; 
  }
}
module.exports = VerifyController;