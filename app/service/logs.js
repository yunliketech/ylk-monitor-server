'use strict';

const Service = require('egg').Service;

class LogsService extends Service {
  async getData () {
    const result = await this.app.mysql.select('c_user');
    return { result };

    let query = this.ctx.request.body;
  }

  async addData (data) {
    const list = []
    // const result = await this.app.mysql.insert('c_logs', {
    //   time: data.time,
    //   device: data.device,
    //   log: "test"
    // });

    for (let i = 0; i < data.log.length; i++) {
      list.push([data.time, data.device, JSON.stringify(data.log[i])]);
    }
    console.log("查询", list)

    const result = await this.app.mysql.query("INSERT INTO c_logs (time, device, log) VALUES ?", [list])

    console.log(result)
  }
}
module.exports = LogsService;
