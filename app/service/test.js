const Service = require('egg').Service;
const checkParam = require('../common/checkParams')
class TestService extends Service {
  async getName(id) {
    const user = await this.app.mysql.get('test',{id});
    return user
  }
  async addName(data) {
    const insert = await this.app.mysql.insert('test',data)
    this.checkParam(insert)
    return insert
  }

  async updateName(data) {
    const update = await this.app.mysql.update('test',data)
    // this.checkParam(insert)
    return update
  }
  async deleteName(data) {
    const state = await this.app.mysql.delete('test',data)
    // this.checkParam(insert)
    return state
  }
}

module.exports = TestService;

