const Service = require('egg').Service;
class WarnInfoService extends Service {
    async list(data) {
        const page = data.page || 1
        const pageSize = data.pageSize || 10
        const startTime = data.startTime || '1970-01-01 00:00:00'
        const endTime = data.endTime || this.ctx.helper.dateFormat("YYYY-mm-dd HH:MM:SS",new Date)
        const total = await this.app.mysql.query(`SELECT count(*) as total  FROM device_warn WHERE time>'${startTime}' AND time< '${endTime}'`)
        const list = await this.app.mysql.query(`SELECT * FROM device_warn WHERE time>'${startTime}' AND time< '${endTime}' ORDER BY id DESC LIMIT ${(page - 1) * pageSize},${pageSize}`)
        let _data = {total:total[0].total,list}
        return _data
    }
    async warnTimes() {
        const list = await this.app.mysql.query(`SELECT count(*) as value,deviceName as name FROM  device_warn GROUP BY deviceName`)
        return list
    }
//     dateFormat(fmt, date) {
//         let ret;
//         const opt = {
//             "Y+": date.getFullYear().toString(),        // 年
//             "m+": (date.getMonth() + 1).toString(),     // 月
//             "d+": date.getDate().toString(),            // 日
//             "H+": date.getHours().toString(),           // 时
//             "M+": date.getMinutes().toString(),         // 分
//             "S+": date.getSeconds().toString()          // 秒
//             // 有其他格式化字符需求可以继续添加，必须转化成字符串
//         };
//         for (let k in opt) {
//             ret = new RegExp("(" + k + ")").exec(fmt);
//             if (ret) {
//                 fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
//             };
//         };
//         return fmt;
//     }
}

module.exports = WarnInfoService;