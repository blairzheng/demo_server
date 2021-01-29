const Service = require('egg').Service;
class RoleService extends Service {
    async addRole(data) {
        let roleName = data.roleName
        const addRoleNameInfo = await this.app.mysql.insert('role', { roleName })
        const getRoleId = await this.app.mysql.query(`SELECT  LAST_INSERT_ID() as roleId`);
        let roleId = getRoleId[0].roleId
        let AllPermissionIds = await this.app.mysql.select(`permission`, { columns: ['id'] });
        let ids = AllPermissionIds.map(item => { return item.id })
        for (const item of data.permissionIds) {
            if (ids.indexOf(item) !== -1) {
                await this.app.mysql.insert('role_permission', { roleId, permissionId: item })
            }
        }
        return true
    }
    async deleteRole(data) {
        let roleId = data.roleId
        const deleteRoleRes = await this.app.mysql.delete('role', {
            id: roleId,
        })
        let result = deleteRoleRes.affectedRows
        if (result) {
            const deletRolePermisson = await this.app.mysql.delete('role_permission', {
                roleId: roleId,
            })
            return result
        } else {
            return result
        }
    }
    async updateRoleName(data) {
        let id = data.id
        let roleName = data.roleName
        let row = { id, roleName }
        let isExistRolename = await this.app.mysql.get('role', { roleName });
        let isExistRole = await this.app.mysql.get('role', { id });
        if(isExistRolename) return "R3" //表示角色名已存在
        if(isExistRole) {
            const updateName = await this.app.mysql.update('role', row);
            return "R1" //表示正常修改角色
        }else{
            return "R2" //表示无效角色
        }
    }
    async maintainPermission(data) {
        let roleId = data.roleId
        let permissionIds = data.permissionIds
        let isExistRole = await this.app.mysql.get(`role`, { id: roleId });
        if (isExistRole) {
            const deletRolePermisson = await this.app.mysql.delete('role_permission', {
                roleId: roleId,
            })
            let AllPermissionIds = await this.app.mysql.select(`permission`, { columns: ['id'] });
            let ids = AllPermissionIds.map(item => { return item.id })
            for (const item of permissionIds) {
                if (ids.indexOf(item) !== -1) {
                    await this.app.mysql.insert('role_permission', { roleId, permissionId: item })
                }
            }
            return true
        }
        return isExistRole
    }
    async listRole(data) {
        const page = data.page || 1
        const pageSize = data.pageSize || 10
        const offset = (page - 1) * pageSize
        const total = await this.app.mysql.query('SELECT COUNT(*) as total FROM role');
        let listRole = await this.app.mysql.query('SELECT * FROM role ORDER BY id DESC LIMIT ?,?',[offset,pageSize]);
        let info = {list:listRole,total:total[0].total}
        return info
    }
    async getPermissionByRoleId(data) {
        let roleId = data.roleId
        let isExistRole = await this.app.mysql.get(`role`, { id: roleId });
        if(isExistRole) {
            let info = await this.app.mysql.query('SELECT permissionId,permissionName,routePath  FROM role as r LEFT JOIN role_permission as rp ON r.id = rp.roleId LEFT JOIN permission as p ON p.id = rp.permissionId WHERE r.id = ?',[roleId]);
           return info 
        }else{
            return isExistRole
        }
    }

}

module.exports = RoleService;