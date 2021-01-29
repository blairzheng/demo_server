const Controller = require('egg').Controller;
const addPermissionRule = {
    permissionName: { type: 'string', require: true },
    routePath: { type: 'string', require: true }
};
const deletePermissionRule = {
    id: { type: 'number', require: true }
};
const updatePermissionRule = {
    id: { type: 'number', require: true },
    permissionName: { type: 'string', require: true },
    routePath: { type: 'string', require: true }
};
class PermissionController extends Controller {
    async addPermission() {
        const { ctx } = this
        ctx.validate(addPermissionRule, ctx.request.body);
        const addPermission = await ctx.service.permission.addPermission(ctx.request.body)
        if (addPermission) {
            ctx.body = {
                code: 0,
                message: "添加权限成功"
            }
        }
    }
    async deletePermission() {
        const { ctx } = this
        ctx.validate(deletePermissionRule, ctx.request.body);
        const deletePermission = await ctx.service.permission.deletePermission(ctx.request.body)
        if (deletePermission) {
            ctx.body = {
                code: 0,
                message: "删除权限成功"
            }
        } else {
            ctx.body = {
                code: 60002,
                message: "无效权限"
            }
        }
    }
    async updatePermission() {
        const { ctx } = this
        ctx.validate(updatePermissionRule, ctx.request.body);
        const updatePermission = await ctx.service.permission.updatePermission(ctx.request.body)
        if (updatePermission === "P1") {
            ctx.body = {
                code: 0,
                message: "修改权限成功"
            }
        } else if(updatePermission === "P2") {
            ctx.body = {
                code: 60002,
                message: "无效权限"
            }
        }else if(updatePermission === "P3") {
            ctx.body = {
                code: 60012,
                message: "权限名称已存在，请使用其他名称"
            }
        }else{
            ctx.body = {
                code: 60112,
                message: "路由名称已存在，请使用其他名称"
            }
        }
    }
    async listPermission() {
        const { ctx } = this
        const listPermission = await ctx.service.permission.listPermission(ctx.request.body)
        if (listPermission) {
            ctx.body = {
                code: 0,
                message: "获取权限列表成功",
                data: listPermission
            }
        } 
    }
}

module.exports = PermissionController;