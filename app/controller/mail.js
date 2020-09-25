const Controller = require('egg').Controller;
const createRule = {
    email: { type: 'string', require: true },

};
class MailController extends Controller {
    async sendMail() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        ctx.validate(createRule, ctx.request.body);
        const email = ctx.request.body.email;  // 接收者的邮箱
        const subject = '鸿鹄能耗平台';
        let verifyCode = Math.floor(Math.random() * 1000000)
        ctx.session.code = verifyCode
        const text = "您的验证码为：" + verifyCode;
        const mail = await ctx.service.mail.sendMail(email, subject, text)
        if (mail) {
            ctx.body = {
                code: 0,
                message: "发送成功"
            }

        } else {
            ctx.body = {
                code: 1,
                message: "发送失败"
            }
        }
    }

}

module.exports = MailController;