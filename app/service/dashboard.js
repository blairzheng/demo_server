const Service = require('egg').Service;
class DashboardService extends Service {
    async getInfo() {
        const deivceTotal = await this.app.mysql.query(`SELECT COUNT(*) as count FROM devices`);
        const uerTotal = await this.app.mysql.query(`SELECT COUNT(*) as count FROM user`);
        const userRecently = await this.app.mysql.query(`SELECT COUNT(*) as count FROM user where DATE_SUB(CURDATE(), INTERVAL 29 DAY) <= loginTime`);
        const warnTotal = await this.app.mysql.query(`SELECT COUNT(*) as count FROM device_warn`);
        const warnYestoday = await this.app.mysql.query(`SELECT COUNT(*) as count FROM device_warn WHERE TO_DAYS( NOW( ) ) - TO_DAYS(time) <= 1`);
        const list = await this.ctx.service.devices.devicesList()
        const Ice = await this.ctx.service.devices.deviceIce(list)
        const highDevice = Ice.reduce((cur, prev) => {
            return cur.p > prev.p ? cur : prev
        }, { device: "", p: 0 })
        return [
            { main: deivceTotal[0].count, tip: deivceTotal[0].count,mainContent:"设备总数",tipContent:"组态总数" },
            { main: userRecently[0].count, tip: uerTotal[0].count,mainContent:"最近30天活跃用户",tipContent:"总用户" },
            { main: warnYestoday[0].count, tip: warnTotal[0].count,mainContent:"今日告警数",tipContent:"历史告警数" },
            { main: highDevice.p, tip: highDevice.device,mainContent:"昨日能耗最高设备能耗值",tipContent:"设备" }
        ]
    }
}

module.exports = DashboardService;