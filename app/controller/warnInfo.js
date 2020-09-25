const Controller = require('egg').Controller;
// const createListRule = {
//     device: { type: 'string', require: true }
// }
class WarnInfoController extends Controller {
    async list() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const list = await ctx.service.warnInfo.list(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
    async warnTimes() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const list = await ctx.service.warnInfo.warnTimes()
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
}

module.exports = WarnInfoController;