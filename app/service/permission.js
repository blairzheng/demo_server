const Service = require('egg').Service;
class PermissionService extends Service {
    async addPermission(data) {
        const add = await this.app.mysql.insert('permission', data)
        return add
    }
    async deletePermission(data) {
        let id = data.id
        let isPermission = await this.app.mysql.get(`permission`, { id });
        if (isPermission) {
            const deletePermission = await this.app.mysql.delete('permission', { id })
            const role_permission = await this.app.mysql.delete('role_permission', {permissionId: id })
            return true
        }else{
            return isPermission
        }
    }
    async updatePermission(data) {
        let id = data.id
        let permissionName = data.permissionName
        let routePath = data.routePath
        let row = { id, permissionName, routePath }
        let isExistPermissionName = await this.app.mysql.get('permission', { permissionName });
        let isExistRoutePath = await this.app.mysql.get('permission', { routePath });
        if(isExistPermissionName) return "P3"
        if(isExistRoutePath) return "P4"
        let isPermission = await this.app.mysql.get(`permission`, { id });
        if (isPermission) {
            const updateName = await this.app.mysql.update('permission', row);
            return "P1"
        }else{
            return "P2"
        }
    }
    async listPermission(data) {
        const page = data.page || 1
        const pageSize = data.pageSize || 10
        const offset = (page - 1) * pageSize
        const total = await this.app.mysql.query('SELECT COUNT(*) as total FROM permission');
        let listPermission = await this.app.mysql.query('SELECT * FROM permission ORDER BY id DESC LIMIT ?,?',[offset,pageSize]);
        let info = {list:listPermission,total:total[0].total}
        return info
    }
}

module.exports = PermissionService;