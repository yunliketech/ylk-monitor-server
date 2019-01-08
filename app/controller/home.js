'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const { ctx, service } = this;
    const result = await ctx.service.home.getData();
    ctx.body = result;
  }
}

module.exports = HomeController;
