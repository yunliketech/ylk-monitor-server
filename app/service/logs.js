'use strict';

const Service = require('egg').Service;

class LogsService extends Service {
  async addData (data) {
    const list = [], listError = [], listDiy = [], listPerformance = [];
    let error = false, diy = false, performance = false;

    console.log(list)
    for (let i = 0; i < data.log.length; i++) {
      // 传入分表diy
      if (data.log[i].type === 'DIY') {
        diy = true;
        listDiy.push([data.time, data.device, data.log[i].type, 1, data.log[i].msg]);
      }
      // 传入分表error
      if (data.log[i].type === 'error') {
        error = true;
        listError.push([data.time, data.device, data.log[i].type, 1,]);
      }
      // 传入分表performance
      if (data.log[i].type === 'performance') {
        performance = true;
        listPerformance.push([data.time, data.device, data.log[i].type, 1,]);
      }
      // 传入总表
      list.push([data.time, data.device, data.log[i].type, 1, JSON.stringify(data.log[i])]);
    }
    console.log("查询", list)
    // 总表输入
    const result = await this.app.mysql.query("INSERT INTO c_logs (time, device, type, project_id, log) VALUES ?", [list])
    // 分表插入 -没有则跳过
    if (diy) {
      const diyResult = await this.app.mysql.query("INSERT INTO c_logs_diy (time, device, type, project_id, msg) VALUES ?",
        [listDiy])
    }
    if (error) {
      const errorResult = await this.app.mysql.query("INSERT INTO c_logs_error (time, device, type, project_id) VALUES ?",
        [listError]);
    }
    if (performance) {
      const performanceResult = await this.app.mysql.query("INSERT INTO c_logs_performance" +
        "(time, device, type, project_id, navigationStart, unloadEventStart, unloadEventEnd, redirectStart, redirectEnd, fetchStart," +
        +"domainLookupStart, domainLookupEnd) VALUES ?",
        [listPerformance])
    }

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
