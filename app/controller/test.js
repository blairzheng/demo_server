const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs')
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const dayjs = require('dayjs');
const createRule = {
    id: 'number',
    name: 'string',
    age: 'number'
};

class HomeController extends Controller {

    async getName() {
        const { ctx } = this;
        console.log(ctx.session.user)
        if (!ctx.session.user) {
            ctx.body = {
                code: -1,
                message: "请先登录"
            }
            return
        }
        const userInfo = await ctx.service.test.getName(ctx.params.id)
        ctx.body = userInfo
    }
    async addName() {
        const { ctx } = this;
        ctx.validate(createRule, ctx.request.body);
        const insert = await ctx.service.test.addName(ctx.request.body)
        ctx.body = { code: 0, message: "添加成功" }

    }
    async updateName() {
        const { ctx } = this;
        // ctx.validate(createRule, ctx.request.body);
        const insert = await ctx.service.test.updateName(ctx.request.body)
        ctx.body = { code: 0, message: "修改成功" }
    }
    async deleteName() {
        const { ctx } = this;
        // ctx.validate(createRule, ctx.request.body);
        const insert = await ctx.service.test.deleteName(ctx.request.body)
        ctx.body = { code: 0, message: "删除成功" }
    }
    async upload() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const uplaodBasePath = 'app/public/upload';
        // 生成文件名
        const filename = `${Date.now()}${Number.parseInt(
            Math.random() * 1000,
        )}${path.extname(stream.filename).toLocaleLowerCase()}`;
        // 生成文件夹
        const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true;
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname);
                    return true;
                }
            }
        }
        mkdirsSync(path.join(uplaodBasePath, dirname));
        // 生成写入路径
        const target = path.join(uplaodBasePath, dirname, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            console.log(err)
        }
        ctx.body = {
            url: path.join('/public/upload', dirname, filename),
            // 所有表单字段都能通过 `stream.fields` 获取到
            fields: stream.fields,
        };
        // ctx.validate(createRule, ctx.request.body);
        // const insert = await ctx.service.test.deleteName(ctx.request.body)
        // ctx.body = {code:0,message:"删除成功"} 
    }
}

module.exports = HomeController;