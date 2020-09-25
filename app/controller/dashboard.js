const Controller = require('egg').Controller;

class DashboardController extends Controller {
    async dashboard() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const list = await ctx.service.dashboard.getInfo()
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
}

module.exports = DashboardController;