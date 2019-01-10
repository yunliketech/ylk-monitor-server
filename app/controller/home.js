'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = "欢迎来到由前端编写的后台架构";
  }
}

module.exports = HomeController;
