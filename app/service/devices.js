const Service = require('egg').Service;
class DevicesService extends Service {
    async devicesList() {
        const devicesList = await this.app.mysql.select('devices');
        return devicesList
    }
    //获取所有设备总能耗
    async deviceIce(data) {
        let Ice = []
        for (var i = 0; i < data.length; i++) {
            const devicesList = await this.app.mysql.select(data[i].deviceName, {
                columns: ['p'],
                orders: [['id', 'desc']],
                limit: 1
            });
            console.log(devicesList)
            let key = data[i].deviceName
            
            // Ice.push({ [key]: devicesList[0].p })
            Ice.push({ device:key,p:devicesList[0].p})
        }
        return Ice
    }
    //按时间获取能耗列表，0表示一天的分组数据，1表示一个月的分组数据，2表示一年的分组数据，3表示每年的数据
    async deviceIceGroup(data) {
        let table = ""
        let type = data.type || 0
        if(data.device) {
            table = data.device
        }else{
            const info = await this.ctx.service.systemSet.getInfo()
            table = info.defaultDevice
        }
        let iceList = null
        if(type == 0) {
            iceList = await this.app.mysql.query(`SELECT MAX(p) as y,DATE_FORMAT(from_unixtime(time), '%H' ) as x FROM ${table} WHERE TO_DAYS( from_unixtime(time)) = TO_DAYS(NOW())  GROUP BY x`);
        }else if(type == 1) {
            iceList = await this.app.mysql.query(`SELECT MAX(p) as y,DATE_FORMAT(from_unixtime(time), '%d' ) as x FROM ${table} WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(from_unixtime(time))  GROUP BY x`);
        }else if(type == 2) {
            iceList = await this.app.mysql.query(`SELECT MAX(p) as y,DATE_FORMAT(from_unixtime(time), '%m' ) as x FROM ${table} WHERE YEAR(from_unixtime(time))=YEAR(NOW()) GROUP BY x`);
        }else{
            iceList = await this.app.mysql.query(`SELECT MAX(p) as y,DATE_FORMAT(from_unixtime(time), '%Y' ) as x FROM ${table} GROUP BY x`);
        }
        // const deviceIceByDay = await this.app.mysql.query();
        return iceList
    }
    async device(data) {
        const device = await this.app.mysql.get('devices', data);
        return device
    }
    async update(data) {
        const update = await this.app.mysql.update('devices', data);
        return update
    }
}

module.exports = DevicesService;