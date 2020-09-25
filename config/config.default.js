// exports.keys = "blair,zheng";
// module.exports = {
//     keys:"blair,zheng",
//     // 加载 errorHandler 中间件
//     middleware: [ 'errorHandler' ],
//     // 只对 /api 前缀的 url 路径生效
//     errorHandler: {
//       match: '/api',
//     },
//   };
// exports.security = {
//     csrf: false
// }
module.exports = appInfo => {
    const config = exports = {};
    config.keys = "blair,zheng";
    config.security = {
        csrf: { enable: false },
        // domainWhiteList: ['http://localhost:8080'], // 配置白名单
    }
    // 注入中间件
    config.middleware = [
        'params',
        'errorHandler'
    ];
    config.errorHandler = {
        match: '/',
    }
    // config.cors = {
    //     // origin: '*',//允许所有跨域访问，注释掉则允许上面 白名单 访问
    //     credentials: true,
    //     allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // };
    config.session = {
        key: 'SESSIONID',
        maxAge: 24 * 3600 * 1000, // 1 天
        httpOnly: true,
        encrypt: true,
        renew: true
    }
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
            // 数据库名
            database: 'energy-platform',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    return config;
};

