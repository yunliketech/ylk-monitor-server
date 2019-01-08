'use strict';

const Controller = require('egg').Controller;

class LogsController extends Controller {
  async index () {
    const { ctx, service } = this;
    const result = await ctx.service.home.getData();
    ctx.body = result;
  }

  async add () {
    const { ctx, service } = this;

    const data = ctx.request.body;
    const result = await ctx.service.logs.addData(data);
    ctx.body = result
  }
}

module.exports = LogsController;
