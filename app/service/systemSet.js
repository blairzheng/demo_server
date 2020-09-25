const Service = require('egg').Service;
class SystemSetService extends Service {
    async getInfo() {
        const device = await this.app.mysql.get('system',{id:1});
        return device
    }
    async updateInfo(data) {
        const device = await this.app.mysql.update('system',data);
        return device
    }
}

module.exports = SystemSetService;