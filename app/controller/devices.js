const Controller = require('egg').Controller;
const createUpdateRule = {
    id: { type: 'number', require: true }
}
class DevicesController extends Controller {
    async list() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const list = await ctx.service.devices.devicesList()
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
    async allDeviceIce() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const list = await ctx.service.devices.devicesList()
        const Ice = await ctx.service.devices.deviceIce(list)
        // console.log(tmp)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: Ice
        }
    }
    async device() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        ctx.validate(createUpdateRule, ctx.request.body);
        const list = await ctx.service.devices.device(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data: list
        }
    }
    async update() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        if (ctx.request.body.deviceName) {
            ctx.body = {
                code: 1,
                message: "设备名称不能修改"
            }
            return
        }
        if (ctx.request.body.deviceType) {
            ctx.body = {
                code: 1,
                message: "设备类型不能修改"
            }
            return
        }
        ctx.validate(createUpdateRule, ctx.request.body);
        const list = await ctx.service.devices.update(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "修改成功"
        }
    }
    //按时间获取能耗列表
    async deviceIceGroup() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        const info = await ctx.service.devices.deviceIceGroup(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "获取信息成功",
            data: info
        }

    }
}

module.exports = DevicesController;