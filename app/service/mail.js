const nodeMailer = require("nodemailer")
const Service = require('egg').Service;
const user_mail = '15050218921@163.com'
const auth_code = 'OSBPQLCPOMTPAQBF'

const transporter = nodeMailer.createTransport({
    host: "smtp.163.com", // 网易的邮件地址
    port: 465, // 端口
    secureConnection: false, // use SSL
    auth: {
        "user": user_mail, // 邮箱账号
        "pass": auth_code // 邮箱的授权码
    }
})

class MailService extends Service {
    async sendMail(email, subject, text) {
        const mailOptions = {
            from: user_mail, // 发送者,与上面的user一致
            to: email,   // 接收者,可以同时发送多个,以逗号隔开
            subject,   // 标题
            text,   // 文本
        };
        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (err) {
            return false;
        }
    }
}
module.exports = MailService;