const Service = require('egg').Service;
const md5 = require('md5-node')
const salt = "asd@saydu32923_+sa()9?><M"
class UserService extends Service {
    async addUser(data) {
        let password = md5(salt + data.password)
        let username = data.username
        const addUserInfo = await this.app.mysql.insert('user', { password, username })
        const getsuerId = await this.app.mysql.query(`SELECT  LAST_INSERT_ID() as userId`);
        let userId = getsuerId[0].userId
        let AllroleIds = await this.app.mysql.select('role', { columns: ['id'] });
        let ids = AllroleIds.map(item => { return item.id })
        for (const item of data.roleIds) {
            if (ids.indexOf(item) !== -1) {
                await this.app.mysql.insert('user_role', { userId, roleId: item })
            }
        }
        return true
    }
    async deleteUser(data) {
        let userId = data.id
        const deleteuser = await this.app.mysql.delete('user', { id: userId })
        let result = deleteuser.affectedRows
        if (result) {
            const deletRole = await this.app.mysql.delete('user_role', { userId })
            return result
        } else {
            return result
        }
    }
    async updateUser(data) {
        let id = data.id
        let password = md5(salt + data.password)
        let username = data.username
        let isExistUser = await this.app.mysql.get('user', { id });
        let isExistUsername = await this.app.mysql.get('user', { username });
        if(isExistUsername) return "U3" //表示修改的用户名已存在
        if(isExistUser) {
            const updateUser = await this.app.mysql.update('user', { id, password, username });
            let result = updateUser.affectedRows
            return "U1" //表示正常修改用户
        }else{
            return "U2" //表示无效用户
        }
    }
    async listUser(data) {
        const page = data.page || 1
        const pageSize = data.pageSize || 10
        const offset = (page - 1) * pageSize
        const total = await this.app.mysql.query('SELECT COUNT(*) as total FROM user');
        let listRole = await this.app.mysql.query('SELECT id,username FROM user ORDER BY id DESC LIMIT ?,?',[offset,pageSize]);
        let info = {list:listRole,total:total[0].total}
        return info
    }
    async maintainRole(data) {
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
}

module.exports = UserService;