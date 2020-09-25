const Service = require('egg').Service;
class MqttService extends Service {
    async list(data) {
        const page = data.page || 1
        const pageSize = data.pageSize || 10
        const startTime = data.startTime || 0
        const endTime = data.endTime || new Date().getTime()
        let table = ""
        if(data.device) {
            table = data.device
        }else{
            const info = await this.ctx.service.systemSet.getInfo()
            table = info.defaultDevice
        }
        const total = await this.app.mysql.query(`SELECT count(*) as total  FROM ${table} WHERE time>${startTime} AND time< ${endTime}`)
        // const list = await this.app.mysql.select(table, {
        //     orders: [['id', 'desc']],
        //     columns: ['content'],
        //     where:{time:[startTime,endTime]},
        //     limit: pageSize,
        //     offset: (page - 1) * pageSize
        // })
        const list = await this.app.mysql.query(`SELECT content  FROM ${table} WHERE time>${startTime} AND time< ${endTime} ORDER BY id DESC LIMIT ${(page - 1) * pageSize},${pageSize}`)
        let _data = {total:total[0].total,list}
        return _data
    }
    async cur(data) {
        let table = ""
        if(data.device) {
            table = data.device
        }else{
            const info = await this.ctx.service.systemSet.getInfo()
            table = info.defaultDevice
        }
        const cur = await this.app.mysql.select(table, {
            orders: [['id', 'desc']],
            columns: ['content'],
            limit: 1,
        });
        return cur[0]
    }
}

module.exports = MqttService;