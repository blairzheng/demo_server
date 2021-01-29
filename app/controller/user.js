const Controller = require('egg').Controller;
const addUserRule = {
    username: { type: 'string', require: true },
    password: { type: 'string', require: true },
    roleIds: { type: 'array', require: true },
};
const deleteUserRule = {
    id: { type: 'number', require: true }
};
const updateUserRule = {
    id: { type: 'number', require: true },
    username: { type: 'string', require: true },
    password: { type: 'string', require: true },
};

class UsreController extends Controller {
    async addUser() {
        const { ctx } = this
        ctx.validate(addUserRule, ctx.request.body);
        const addUser = await ctx.service.user.addUser(ctx.request.body)
        if (addUser) {
            ctx.body = {
                code: 0,
                message: "添加用户成功"
            }
        }
    }
    async deleteUser() {
        const { ctx } = this
        ctx.validate(deleteUserRule, ctx.request.body);
        const deleteUser = await ctx.service.user.deleteUser(ctx.request.body)
        if (deleteUser) {
            ctx.body = {
                code: 0,
                message: "删除用户成功"
            }
        } else {
            ctx.body = {
                code: 60003,
                message: "无效用户"
            }
        }
    }
    async updateUser() {
        const { ctx } = this
        ctx.validate(updateUserRule, ctx.request.body);
        const updateUser = await ctx.service.user.updateUser(ctx.request.body)
        if (updateUser === "U1") {
            ctx.body = {
                code: 0,
                message: "用户修改成功"
            }
        } else if(updateUser === "U2"){
            ctx.body = {
                code: 60003,
                message: "无效用户"
            }
        }else{
            ctx.body = {
                code: 60013,
                message: "该用户名已存在，请使用其他名称"
            }
        }
    }
    async listUser() {
        const { ctx } = this
        const list = await ctx.service.user.listUser(ctx.request.body)
        if (list) {
            ctx.body = {
                code: 0,
                message: "获取用户列表成功",
                data: list
            }
        }
    }
}

module.exports = UsreController;