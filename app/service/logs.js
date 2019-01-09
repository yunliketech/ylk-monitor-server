'use strict';

const Service = require('egg').Service;

class LogsService extends Service {
  async addData (data) {
    const list = []

    for (let i = 0; i < data.log.length; i++) {
      list.push([data.time, data.device, JSON.stringify(data.log[i]), data.log[i].type], 1);
    }
    console.log("查询", list)

    const result = await this.app.mysql.query("INSERT INTO c_logs (time, device, log, type, project_id) VALUES ?", [list])

    return { result };
  }


  async serachData (data) {

    console.log(data);
    const pageNum = data.pageNum
    const pageSize = data.pageSize
    const type = data.type;

    const result = await this.app.mysql.select('c_logs', {
      where: { type: 'DIY' }, // WHERE 条件
      limit: Number(pageSize), // 返回数据量
      offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
    })

    // for循环返回数据至前端数据
    for (let i = 0; i < result.length; i++) {
      result[i].log = JSON.parse(result[i].log);
    }

    return { result };
  }

}
module.exports = LogsService;
