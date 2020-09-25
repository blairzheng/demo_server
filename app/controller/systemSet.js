const Controller = require('egg').Controller;
const createUpdateRule = {
    id: { type: 'number', require: true }
};
class SystemSetController extends Controller {
    async getInfo() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const info = await ctx.service.systemSet.getInfo()
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
        ctx.validate(createUpdateRule, ctx.request.body);
        const info = await ctx.service.systemSet.updateInfo(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "修改成功"
        }
    }
}

module.exports = SystemSetController;