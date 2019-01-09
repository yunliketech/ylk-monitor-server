'use strict';

const Service = require('egg').Service;

class LogsService extends Service {
  async addData (data) {
    const list = []

    for (let i = 0; i < data.log.length; i++) {
      list.push([data.time, data.device, JSON.stringify(data.log[i]), data.log[i].type]);
    }
    console.log("查询", list)

    const result = await this.app.mysql.query("INSERT INTO c_logs (time, device, log,type) VALUES ?", [list])

    return { result };
  }


  async serachData (data) {

    console.log(data);
    const pageNum = data.pageNum
    const pageSize = data.pageSize


    const result = await this.app.mysql.select('c_logs', {
      limit: Number(pageSize), // 返回数据量
      offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
    })

    return { result };
  }

}
module.exports = LogsService;
