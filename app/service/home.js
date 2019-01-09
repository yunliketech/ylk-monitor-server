'use strict';
const Service = require('egg').Service;
class HomeService extends Service {
  async getData () {
    const result = await this.app.mysql.select('c_user');
    return { result };
  }
}
module.exports = HomeService;
