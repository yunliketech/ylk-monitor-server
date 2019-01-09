'use strict';

const Controller = require('egg').Controller;

class LogsController extends Controller {
  async add () {
    const { ctx, service } = this;

    const data = ctx.request.body;
    const result = await ctx.service.logs.addData(data);
    ctx.body = result
  }

  async list () {
    const { ctx, service } = this;

    const data = ctx.query;
    const result = await ctx.service.logs.serachData(data);

    ctx.body = result;
  }
}

module.exports = LogsController;
