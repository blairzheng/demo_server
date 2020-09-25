const Controller = require('egg').Controller;
// const createLoginRule = {
//     username: { type: 'string', require: true },
//     password: { type: 'string', require: true },
//     verifyCode: { type: 'string', require: true }
// };
// const createAddRule = {
//     username: { type: 'string', require: true },
//     password: { type: 'string', require: true },
//     company: { type: 'string', require: true }
// };
// const createUpdateMailRule = {
//     email: { type: 'string', require: true },
//     emailCode: { type: 'number', require: true }
// };
const createUpdateRule = {
    Vup: 'number',
    Vdown: 'number',
    Aup: 'number',
    Adown: 'number',
    Pup: 'number',
    Pdown: 'number',
    warnway: 'number'
};
// const createDeleteRule = {
//     id: { type: 'number', require: true }
// };
class WarnSetController extends Controller {
    async info() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const info = await ctx.service.warnSet.info()
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: info
        }
    }
    async updateInfo() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        // ctx.validate(createUpdateRule, ctx.request.body);
        const update = await ctx.service.warnSet.updateInfo(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "修改成功",
            data: update
        }
    }
}

module.exports = WarnSetController;