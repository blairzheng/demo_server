const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const options = {
    size: 4,                 // 验证码长度(显示几个字符)
    fontSize: 30,           // 验证码的字体大小
    width: 100,              // 验证码的宽度
    height: 40,             // 验证码的高度
    background: '#cc9966',   // 验证码的背景颜色
  };
class VerifyService extends Service {
    async captcha() {
        // 第三方插件，实现验证码功能
        const captcha = svgCaptcha.create(options);
        // 将验证码text文本保存到全局session中， 观察者/发布者订阅模式
        this.ctx.session.verifyCode = captcha.text.toUpperCase();
        console.log(this.ctx.session.verifyCode)
        return captcha;
      }
  }
  
  module.exports = VerifyService;