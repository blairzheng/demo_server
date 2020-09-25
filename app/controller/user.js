const Controller = require('egg').Controller;
const createLoginRule = {
    username: { type: 'string', require: true },
    password: { type: 'string', require: true },
    verifyCode: { type: 'string', require: true }
};
const createAddRule = {
    username: { type: 'string', require: true },
    password: { type: 'string', require: true },
    company: { type: 'string', require: true }
};
const createUpdateMailRule = {
    email: { type: 'string', require: true },
    emailCode: { type: 'number', require: true }
};
const createUpdateRule = {
    emailCode: { type: 'number', require: true }
};
const createDeleteRule = {
    id: { type: 'number', require: true }
};
const updateStatusRule = {
    id: { type: 'number', require: true },
    status: { type: 'number', require: true }
};
const updatePassRule = {
    username: { type: 'string', require: true },
    email: { type: 'string', require: true }
};
class UsreController extends Controller {
    async login() {
        const { ctx } = this
        ctx.validate(createLoginRule, ctx.request.body);
        // console.log(ctx.request.body.verifyCode.toUpperCase(),ctx.session)
        if (ctx.request.body.verifyCode.toUpperCase() !== ctx.session.verifyCode) {
            ctx.body = {
                code: 1,
                message: "验证码不正确"
            }
            return
        }
        const userInfo = await ctx.service.user.login(ctx.request.body)
        if (userInfo[0]) {
            if (userInfo[0].status != 1 && userInfo[0].id != 1) {
                ctx.body = {
                    code: 1,
                    message: "禁止登陆"
                }
                return
            }
            ctx.session.user = userInfo[0].username
            ctx.session.id = userInfo[0].id

            ctx.session.maxAge = 24 * 60 * 60 * 1000
            const updateLoginTime = await ctx.service.user.updateLoginTime()
            ctx.body = {
                code: 0,
                message: "登录成功",
                data: { id: userInfo[0].id, username: userInfo[0].username, email: userInfo[0].email, company: userInfo[0].company }
            }
        } else {
            ctx.body = {
                code: 1,
                message: "用户名或密码不正确"
            }
        }

    }
    async logout() {
        const { ctx } = this
        ctx.session = null
        ctx.body = {
            code: 0,
            message: "登出成功"
        }
    }
    async changeUserState() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        if (ctx.request.body.id == 1) {
            ctx.body = {
                code: 1,
                message: "改用户无法更改状态"
            }
            return
        }
        ctx.validate(updateStatusRule, ctx.request.body);
        const status = await ctx.service.user.updateStatus(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "修改状态成功"
        }
    }
    async deleteuser() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        ctx.validate(createDeleteRule, ctx.request.body);
        if (ctx.request.body.id === 1) {
            ctx.body = {
                code: 1,
                message: "该用户不能被删除"
            }
            return
        }
        const deleteuser = await ctx.service.user.deleteuser(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "删除用户成功"
        }
    }
    async updateuser() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        if (ctx.session.code !== ctx.request.body.emailCode) {
            ctx.body = {
                code: 1,
                message: "邮箱验证码不正确"
            }
            return
        }
        ctx.validate(createUpdateRule, ctx.request.body);
        const updateuser = await ctx.service.user.updateuser(ctx.request.body)
        ctx.body = {
            code: 0,
            message: "修改用户信息成功"
        }
    }
    async adduser() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        ctx.validate(createAddRule, ctx.request.body);
        if (ctx.session.id !== 1) {
            ctx.body = {
                code: 1,
                message: "你没有权限"
            }
            return
        }
        const adduser = await ctx.service.user.adduser(ctx.request.body)
        if (adduser) {
            ctx.body = {
                code: 0,
                message: "创建用户成功"
            }
        } else {
            ctx.body = {
                code: 1,
                message: "创建用户失败"
            }
        }
    }
    async userList() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        if (ctx.session.id !== 1) {
            ctx.body = {
                code: 1,
                message: "你没有权限"
            }
            return
        }
        const userList = await ctx.service.user.userList()
        if (userList) {
            ctx.body = {
                code: 0,
                message: "获取用户列表成功",
                data: userList
            }
        } else {
            ctx.body = {
                code: 1,
                message: "获取用户列表失败"
            }
        }
    }
    async bindMail() {
        const { ctx } = this
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "你还未登陆"
            }
            return
        }
        if (ctx.session.code !== ctx.request.body.emailCode) {
            ctx.body = {
                code: 1,
                message: "邮箱验证码不正确"
            }
            return
        }
        ctx.validate(createUpdateMailRule, ctx.request.body);
        ctx.body = {
            code: 0,
            message: "更改邮箱成功"
        }
        const bindMail = await ctx.service.user.updatemail(ctx.request.body)
        if (bindMail) {
            ctx.body = {
                code: 0,
                message: "更改邮箱成功"
            }
        } else {
            ctx.body = {
                code: 1,
                message: "更改邮箱失败"
            }
        }
    }
    async updatePassByMail() {
        const { ctx } = this
        ctx.validate(updatePassRule, ctx.request.body);
        const newPwd = await ctx.service.user.updatePassByMail(ctx.request.body)
        if (newPwd) {
            let text = `您的密码已重置，当前密码为${newPwd},请尽快修改`
            const mail = await ctx.service.mail.sendMail(ctx.request.body.email, '鸿鹄能耗平台', text)
            if (mail) {
                ctx.body = {
                    code: 0,
                    message: "密码重置成功，请到邮箱查看"
                }

            } else {
                ctx.body = {
                    code: 1,
                    message: "邮件发送失败"
                }
            }
        } else {
            ctx.body = {
                code: 1,
                message: "用户名或绑定邮箱不正确",
            }
        }

    }

}

module.exports = UsreController;