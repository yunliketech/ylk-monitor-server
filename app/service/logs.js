'use strict';

const Service = require('egg').Service;
const SqlLogs = require('../sql/log');

class LogsService extends Service {
  async addData (data) {
    const list = [], listError = [], listDiy = [], listPerformance = [];
    let error = false, diy = false, performance = false;
    // 循环获得数据
    for (let i = 0; i < data.log.length; i++) {
      // 传入分表diy
      if (data.log[i].type === 'DIY') {
        diy = true;
        listDiy.push([data.time, data.device, data.log[i].type, data.id, data.log[i].msg]);
      }
      // 传入分表error
      if (data.log[i].type === 'error') {
        error = true;
        const errorLog = data.log[i].data;
        listError.push([data.time, data.device, data.log[i].type, data.id, errorLog.msg,
        error.target, errorLog.rowNum, errorLog.colNum, errorLog.orgMsg, data.log[i].hash, errorLog.tag, errorLog.stack]);
      }
      // 传入分表performance
      if (data.log[i].type === 'performance') {
        performance = true;
        const performanceLog = data.log[i].data;
        // 计算request请求时间
        const logRequestTime = performanceLog.responseEnd != "" && performanceLog.responseStart != "" ?
          Number(performanceLog.responseEnd) - Number(performanceLog.responseStart) : null;
        // 计算解析dom树操作
        const logDomTime = performanceLog.domComplete != "" && performanceLog.domInteractive != "" ?
          Number(performanceLog.domComplete) - Number(performanceLog.domInteractive) : null;
        // 计算白屏时间
        const logWhiteScreenTime = performanceLog.responseStart != "" && performanceLog.navigationStart != "" ?
          Number(performanceLog.responseStart) - Number(performanceLog.navigationStart) : null;
        // 计算dom ready时间
        const logDomReadyTime = performanceLog.domContentLoadedEventEnd != "" && performanceLog.navigationStart != "" ?
          Number(performanceLog.domContentLoadedEventEnd) - Number(performanceLog.navigationStart) : null;
        // 计算onload时间
        const logOnLoadTime = performanceLog.loadEventEnd != "" && performanceLog.navigationStart != "" ?
          Number(performanceLog.loadEventEnd) - Number(performanceLog.navigationStart) : null;
        // 计算首次渲染时间
        const logFirstReadyTime = null;
        // 计算TTI 时间
        const logTTI = performanceLog.domInteractive != "" && performanceLog.requestStart != "" ?
          Number(performanceLog.domInteractive) - Number(performanceLog.requestStart) : null;
        // 计算DURATION时间
        const logDurationTime = null;
        // 计算fetch duration时间
        const logFetchTime = null;
        // 计算onrender onfirstajax时间
        const logOnRenderTime = null;
        // 传入数据 - 性能指标
        listPerformance.push([data.time, data.device, data.log[i].type, data.id, performanceLog.navigationStart,
        performanceLog.unloadEventStart, performanceLog.unloadEventEnd, performanceLog.redirectStart, performanceLog.redirectEnd,
        performanceLog.fetchStart, performanceLog.domainLookupStart, performanceLog.domainLookupEnd, performanceLog.connectStart,
        performanceLog.connectEnd, performanceLog.secureConnectionStart, performanceLog.requestStart, performanceLog.responseStart,
        performanceLog.responseEnd, performanceLog.domLoading, performanceLog.domInteractive, performanceLog.domContentLoadedEventStart,
        performanceLog.domContentLoadedEventEnd, performanceLog.domComplete, performanceLog.loadEventStart, performanceLog.loadEventEnd,
          logRequestTime, logDomTime, logWhiteScreenTime, logDomReadyTime, logOnLoadTime, logFirstReadyTime, logTTI, logDurationTime,
          logFetchTime, logOnRenderTime]);
      }
      // 传入总表
      list.push([data.time, data.device, data.log[i].type, data.id, JSON.stringify(data.log[i])]);
    }
    console.log("查询", list)
    // 总表输入
    const result = await this.app.mysql.query(SqlLogs.allTable, [list])
    // 分表插入 -没有则跳过
    if (diy) {
      const diyResult = await this.app.mysql.query(SqlLogs.diyTable, [listDiy])
    }
    // 分表插入 - 没有则跳过
    if (error) {
      const errorResult = await this.app.mysql.query(SqlLogs.errorTable, [listError]);
    }
    // 分表插入 - 没有则跳过
    if (performance) {
      const performanceResult = await this.app.mysql.query(SqlLogs.performanceTable, [listPerformance])
    }

    return { result };
  }

  async serachData (data) {
    console.log(data);
    const pageNum = data.pageNum
    const pageSize = data.pageSize
    // 0-diy ,1-performance,2-error , -1全部
    const type = data.type == 0 ? "DIY" : data.type == 1 ? "performance" : data.type == 2 ? "error" : data.type;
    let result;
    let count;

    switch (type) {
      case "DIY":
        // 查询表中数据
        result = await this.app.mysql.select('c_logs_diy', {
          limit: Number(pageSize), // 返回数据量
          offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
        })
        // 查询数据总量
        count = await this.app.mysql.query(SqlLogs.countDiy);
        count = count[0]["count(*)"];
        break;
      case "performance":
        // 查询表中数据
        result = await this.app.mysql.select('c_logs_performance', {
          limit: Number(pageSize), // 返回数据量
          offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
        })
        // 查询数据总量
        count = await this.app.mysql.query(SqlLogs.countPerformance);
        count = count[0]["count(*)"];
        break;
      case "error":
        // 查询表中数据
        result = await this.app.mysql.select('c_logs_error', {
          limit: Number(pageSize), // 返回数据量
          offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
        })
        // 查询数据总量
        count = await this.app.mysql.query(SqlLogs.countError);
        count = count[0]["count(*)"];
        break;
      default:
        // 查询表中数据
        result = await this.app.mysql.select('c_logs', {
          limit: Number(pageSize), // 返回数据量
          offset: pageNum == 1 ? 0 : Number(pageNum * pageSize), // 数据偏移量
        })
        // 查询数据总量
        count = await this.app.mysql.query(SqlLogs.countAll);
        count = count[0]["count(*)"];
        // for循环返回数据至前端数据 - 制造json数据
        for (let i = 0; i < result.length; i++) {
          result[i].log = JSON.parse(result[i].log);
        }
        break;
    }

    return { result, count };
  }

}
module.exports = LogsService;
