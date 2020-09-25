const Service = require('egg').Service;
class UserService extends Service {
    async login(data) {
        const user = await this.app.mysql.select('user', {
            where: { username: data.username, password: data.password },
            limit: 1
        });
        return user
    }
    async deleteuser(data) {
        const deleteuser = await this.app.mysql.delete('user', data)
        return deleteuser
    }
    async updateStatus(data) {
        const updateStatus = await this.app.mysql.update('user', data)
        return updateStatus
    }
    async updateLoginTime() {
        const options = {
            where: {
                id: this.ctx.session.id
            }
        };
        const updateLoginTime = await this.app.mysql.update('user', { loginTime: this.ctx.helper.dateFormat("YYYY-mm-dd HH:MM:SS", new Date) }, options)
    }
    async adduser(data) {
        const add = await this.app.mysql.insert('user', data)
        return add
    }
    async updateuser(data) {
        delete data.emailCode
        let userData = Object.assign(data, { id: this.ctx.session.id })
        const updateuser = await this.app.mysql.update('user', userData)
        return updateuser
    }
    async updatemail(data) {
        let mailData = { email: data.email, id: this.ctx.session.id }
        const updatemail = await this.app.mysql.update('user', mailData)
        return updatemail
    }
    async userList() {
        const userList = await this.app.mysql.select('user', { columns: ['id', 'username', 'email', 'company', 'status', 'createTime', 'loginTime'] })
        return userList
    }
    async updatePassByMail(data) {
        const newPwd = ""
        const user = await this.app.mysql.select('user', {
            where: { username: data.username, email: data.email },
            limit: 1
        });
        if (user.length != 0) {
            let newPwd = Math.floor(Math.random() * 1000000)
            let options = {
                where: {
                    username: data.username,
                    email: data.email
                }
            };
          let info =  await this.app.mysql.update('user', { password: newPwd }, options)
          return newPwd
        }
        return newPwd
    }
}

module.exports = UserService;