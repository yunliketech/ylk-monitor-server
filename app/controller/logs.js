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

    let query = ctx.request.body;
    console.log(query)
    ctx.body = query
  }
}

module.exports = LogsController;
