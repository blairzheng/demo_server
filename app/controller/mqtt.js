const Controller = require('egg').Controller;
const createListRule = {
    device: { type: 'string', require: true }
}
class MqttController extends Controller {
    async list() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        // ctx.validate(createListRule, ctx.request.body);
        const list = await ctx.service.mqtt.list(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
    async cur() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        // ctx.validate(createListRule, ctx.request.body);
        const cur = await ctx.service.mqtt.cur(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: cur
        }
    }
}

module.exports = MqttController;