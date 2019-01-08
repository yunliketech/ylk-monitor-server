'use strict';

const Service = require('egg').Service;

class LogsService extends Service {
  async getData () {
    const result = await this.app.mysql.select('c_user');
    return { result };

    let query = this.ctx.request.body;
  }

  async addData(){
    
  }
}
module.exports = LogsService;
