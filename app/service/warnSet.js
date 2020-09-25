const Service = require('egg').Service;
class WarnSetService extends Service {
    async info() {
        const info = await this.app.mysql.select('warn_value');
        return info
    }
    async updateInfo(data) {
        let _data = Object.assign(data, { id: 1 })
        const info = await this.app.mysql.update('warn_value', _data);
        return info
    }
}

module.exports = WarnSetService;