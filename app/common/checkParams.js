function checkSuccess(result) {
    if (result.status !== 200) {
        const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
        this.ctx.body(result.status, errorMsg);
    }
    if (!result.data.success) {
        // 远程调用返回格式错误
        this.ctx.body(500, 'remote response error', { data: result.data });
    }
}
exports = checkSuccess