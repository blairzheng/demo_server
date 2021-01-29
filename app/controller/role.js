const Controller = require('egg').Controller;
const addRoleRule = {
    roleName: { type: 'string', require: true },
    permissionIds: { type: 'array', require: true }
};
const deleteRoleRule = {
    roleId: { type: 'number', require: true },
};
const updateRoleNameRule = {
    id: { type: 'number', require: true },
    roleName: { type: 'string', require: true },
};
const maintainPermissionRule = {
    roleId: { type: 'number', require: true },
    permissionIds: { type: 'array', require: true },
};
const getPermissionByRoleIdRule = {
    roleId: { type: 'number', require: true }
};
class RoleController extends Controller {
    async addRole() {
        const { ctx } = this
        ctx.validate(addRoleRule, ctx.request.body);
        const addRole = await ctx.service.role.addRole(ctx.request.body)
        if (addRole) {
            ctx.body = {
                code: 0,
                message: "添加角色成功"
            }
        }
    }
    async deleteRole() {
        const { ctx } = this
        ctx.validate(deleteRoleRule, ctx.request.body);
        const addRole = await ctx.service.role.deleteRole(ctx.request.body)
        if (addRole) {
            ctx.body = {
                code: 0,
                message: "删除角色成功"
            }
        } else {
            ctx.body = {
                code: 60001,
                message: "无效角色"
            }
        }
    }
    async updateRoleName() {
        const { ctx } = this
        ctx.validate(updateRoleNameRule, ctx.request.body);
        const updateRoleName = await ctx.service.role.updateRoleName(ctx.request.body)
        if (updateRoleName === "R1") {
            ctx.body = {
                code: 0,
                message: "角色名称修改成功"
            }
        } else if(updateRoleName === "R2") {
            ctx.body = {
                code: 60001,
                message: "无效角色"
            }
        }else{
            ctx.body = {
                code: 60011,
                message: "角色名称已存在，请使用其他名称"
            }
        }
    }
    async maintainPermission() {
        const { ctx } = this
        ctx.validate(maintainPermissionRule, ctx.request.body);
        const maintainPermission = await ctx.service.role.maintainPermission(ctx.request.body)
        if (maintainPermission) {
            ctx.body = {
                code: 0,
                message: "权限维护成功"
            }
        } else {
            ctx.body = {
                code: 60001,
                message: "无效角色"
            }
        }
    }
    async listRole() {
        const { ctx } = this
        const list = await ctx.service.role.listRole(ctx.request.body)
        if (list) {
            ctx.body = {
                code: 0,
                message: "获取角色列表成功",
                data: list
            }
        }
    }
    async getPermissionByRoleId() {
        const { ctx } = this
        ctx.validate(getPermissionByRoleIdRule, ctx.request.body);
        const permissionList = await ctx.service.role.getPermissionByRoleId(ctx.request.body)
        if (permissionList) {
            ctx.body = {
                code: 0,
                message: "获取权限列表成功",
                data: permissionList
            }
        } else {
            ctx.body = {
                code: 60001,
                message: "无效角色"
            }
        }
    }
}

module.exports = RoleController;